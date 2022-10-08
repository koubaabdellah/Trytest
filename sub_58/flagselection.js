function selecteerTaal(taal) {
    var cookie = 'cbs.iam.culture=' + taal + '; path=/; domain=' + domainForCookie;
    document.cookie = cookie;
    // Als er geen query parameter zijn, voeg dan eventueel query parameters vanuit
    // ViewModel toe
    var reloadUrl = window.location.href;
    if (window.location.search === '' && queryParamsForPageRefresh !== '') {
        reloadUrl += '?' + queryParamsForPageRefresh;
    }

    reloadUrl = reloadUrl.replace(/\?taalkeuze=nld/ig, '?taalkeuze=').replace(/\?taalkeuze=eng/ig, '?taalkeuze=').replace(/\&taalkeuze=nld/ig, '').replace(/\&taalkeuze=eng/ig, '');

    window.location = reloadUrl;
}
