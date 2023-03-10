async function fetchHtmlAsText(url) {
    return await (await fetch(url)).text();
}
async function importPage(target) {
    document.querySelector('#' + target).innerHTML = await fetchHtmlAsText('../../Components/' + target + '/' + target + '.html');
}

importPage('Header');
importPage('Footer');
// importPage('Profile');
// importPage('RecentQuestion');
// importPage('HotTopic');
// importPage('MiniQuestion');