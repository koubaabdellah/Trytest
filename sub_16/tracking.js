const isSiteSearch = (req) => {
  return req.url.includes('_api/home/search-autocomplete') || req.url.includes('-search')
}

window.phoenixCreated = (ctx) => {
  // ===
  // Piwik Tracking
  // ===

  function getPiwik () {
    // if window.Piwik is still undefined when counter reaches 3000ms we reject and go to error

    return new Promise((resolve, reject) => {
      const checkInterval = 50
      const timeout = 3000
      const waitStart = Date.now()

      const interval = setInterval(() => {
        if (window.Piwik) {
          clearInterval(interval)
          return resolve(window.Piwik)
        }

        if (Date.now() >= waitStart + timeout) {
          clearInterval(interval)
        }
      }, checkInterval)
    })
  }

  const { _paq } = window

  // Track all service calls
  ctx.service.on(200, ({ req, res }) => {
    if (!_paq) return

    // Catch site search
    if (req) {
      if (isSiteSearch(req)) {
        const url = new URL(req.url)
        const params = Object.fromEntries(url.searchParams)

        const keyword = params.querystring
        const category = false
        const searchCount = false
        const trackSiteSearch = ['trackSiteSearch', keyword, category, searchCount]

        // https://developer.matomo.org/guides/tracking-javascript-guide
        _paq.push(trackSiteSearch)
      }
    }
  })

  // Track route change
  ctx.router.beforeEach((to, from, next) => {
    getPiwik()
      .then((Piwik) => {
        const tracker = Piwik.getAsyncTracker()
        var currentUrl = location.href
        tracker.setReferrerUrl(currentUrl)
        currentUrl = '/' + window.location.hash.substr(1)
        tracker.setCustomUrl(currentUrl)
        tracker.trackPageView(document.title)
      }).catch((error) => {
        if (error.target) {
          return console.error(
            `[piwik] An error occurred trying to load ${error.target.src}. ` +
              'If the file exists you may have an ad- or trackingblocker enabled.'
          )
        }
      })

    // Make sure the router continues
    next()
  })

  // ===
  // Tracking Phoenix pages with Google analytics
  // ===
  if (window.gtag) {
    const { gtag } = window

    // Track all service calls
    ctx.service.on(200, ({ req, res }) => {
      // Catch site search
      if (req) {
        if (isSiteSearch(req)) {
          const url = new URL(req.url)
          const params = Object.fromEntries(url.searchParams)

          const keyword = params.querystring

          // https://developers.google.com/tag-platform/gtagjs/reference/events#search
          gtag('event', 'search', {
            search_term: keyword
          })
        }
      }
    })

    // Track route change
    ctx.router.beforeEach((to, from, next) => {
      gtag('event', 'page_view', {
        page_title: document.title,
        page_location: location.href,
        page_path: to.path
      })
      next()
    })
  }
}
