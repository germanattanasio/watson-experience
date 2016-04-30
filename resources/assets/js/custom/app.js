new Vue({
  el: '#app',
  data: {
    termsOfService: false,
    confirm_end: false,
    inactive: false,
    logging_in: false,
    current_role: 'developer',
    applications: [],
    selected_application: null,
    selected_component: null,
    view_text: 'View your Personality Insight',
    pi_title: 'Your Watson Personality Insight is ready',
    iframe: null,
    user_inputted_twitter: null,
    user_inputted_email: null,
    partially_opened_app: null,
    personality_insights_loaded: false,
    toggle_sunburst: false,
    has_logged_in: false,
    already_clicked: [],
    roles: [{
      name: 'Developer',
      slug: 'developer',
      title: 'build',
      intro: 'Cognitive thinks so you can outthink limits.',
      definition: 'Build your apps, your way. Take risks and invent with speed and confidence.',
      promo: {
        name: 'Watson Developer Cloud',
        link: 'http://www.ibm.com/watsondevelopercloud/'
      }
    }, {
      name: 'Entrepreneur',
      slug: 'startup',
      title: 'launch',
      intro: 'Cognitive thinks so you can outthink challenges.',
      definition: 'Launch your next best idea or business, with agility and economy.',
      promo: {
        name: 'Startups',
        link: 'https://www-01.ibm.com/software/info/ecod/cloudoffer/startup.html'
      }
    }],
    'components': [{
        'name': 'Tradeoff Analytics',
        'slug': 'tradeoff_analytics',
        'content_blocks': [{
          'header': 'What it is',
          'content': 'Tradeoff Analytics is a Watson service that helps people make decisions when balancing multiple objectives.'
        }, {
          'header': null,
          'content': 'The service uses a mathematical filtering technique called “Pareto Optimization,” that enables users to explore tradeoffs when considering multiple criteria for a single decision.'
        }],
        'icon': 'cogc-01.svg',
        'url': 'http://www.ibm.com/smarterplanet/us/en/ibmwatson/developercloud/tradeoff-analytics.html'
      }, {
        'name': 'Personality Insights',
        'slug': 'personality_insights',
        'content_blocks': [{
          'header': 'What it is',
          'content': 'Personality Insights extracts and analyzes a spectrum of personality attributes to help discover actionable insights about people and entities, and in turn guides end users to highly personalized interactions.'
        }],
        'icon': 'cogc-02.svg',
        'url': 'http://www.ibm.com/smarterplanet/us/en/ibmwatson/developercloud/personality-insights.html'
      }, {
        'name': 'AlchemyVision',
        'slug': 'alchemy_vision',
        'content_blocks': [{
          'header': 'What it is',
          'content': "AlchemyVision employs our deep learning innovations to understand a picture's content and context"
        }],
        'icon': 'vision.svg',
        'url': 'http://www.ibm.com/smarterplanet/us/en/ibmwatson/developercloud/alchemy-vision.html'
      },{
        'name': 'Visual Recognition',
        'slug': 'visual_recognition',
        'content_blocks': [{
          'header': 'What it is',
          'content': "Visual Recognition allows you to derive insights from an image based on its visual content"
        }],
        'icon': 'visual-recognition.svg',
        'url': 'http://www.ibm.com/smarterplanet/us/en/ibmwatson/developercloud/visual-recognition.html'
      }, {
        'name': 'AlchemyData News',
        'slug': 'alchemydata_news',
        'content_blocks': [{
          'header': 'What it is',
          'content': "Provides news and blog content enriched with natural language processing to allow for highly targeted search and trend analysis. Now you can query the world's news sources and blogs like a database."
        }],
        'icon': 'cogc-03.svg',
        'url': 'http://www.ibm.com/smarterplanet/us/en/ibmwatson/developercloud/alchemy-data-news.html'
      }, {
        'name': 'Developer',
        'slug': 'developer',
        'content_blocks': [{
          'header': 'What it does',
          'content': "IBM Watson Developer Cloud enables cognitive computing features in your app using IBM Watson's cognitive components."
        }],
        'icon': 'developer.svg',
        'url': 'https://www.ibm.com/smarterplanet/us/en/ibmwatson/developercloud/'
      }, {
        'name': 'Concept Insights',
        'slug': 'concept_insights',
        'content_blocks': [{
          'header': 'What it is',
          'content': 'Concept Insights explores information based on the concepts behind your input.'
        }],
        'icon': 'cogc-04.svg',
        'url': 'https://console.ng.bluemix.net/catalog/services/concept-insights'
      }, {
        'name': 'Relationship Extraction',
        'slug': 'relationship_extraction',
        'content_blocks': [{
          'header': 'What it is',
          'content': 'Relationship Extraction extracts relationships between different text entities.'
        }],
        'icon': 'cogc-05.svg',
        'url': 'http://www.ibm.com/smarterplanet/us/en/ibmwatson/developercloud/relationship-extraction.html'
      }, {
        'name': 'Watson',
        'slug': 'watson',
        'content_blocks': [{
          'header': 'What it is',
          'content': 'IBM Watson is a cognitive system enabling a new partnership between people and computers.'
        }],
        'icon': 'watson.png',
        'url': 'http://www.ibm.com/smarterplanet/us/en/ibmwatson/'
      }, {
        'name': 'Natural Language Classifier',
        'slug': 'natural_language_classifier',
        'content_blocks': [{
          'header': 'What it is',
          'content': 'Interpret and classify natural language with confidence.'
        }],
        'icon': 'nlc.svg',
        'url': 'http://www.ibm.com/smarterplanet/us/en/ibmwatson/developercloud/nl-classifier.html'
      }, {
        'name': 'Text to Speech',
        'slug': 'text_to_speech',
        'content_blocks': [{
          'header': 'What it is',
          'content': 'Designed for streaming low-latency synthesis of audio from written text. The service synthesizes natural-sounding speech from input text in a variety of languages and voices that speak with appropriate cadence and intonation.'
        }],
        'icon': 'tts.svg',
        'url': 'http://www.ibm.com/smarterplanet/us/en/ibmwatson/developercloud/text-to-speech.html'
      }, {
        'name': 'Speech to Text',
        'slug': 'speech_to_text',
        'content_blocks': [{
          'header': 'What it is',
          'content': 'The Speech to Text service converts the human voice into the written word.'
        }],
        'icon': 'stt.svg',
        'url': 'http://www.ibm.com/smarterplanet/us/en/ibmwatson/developercloud/speech-to-text.html'
      }, {
        'name': 'Dialog',
        'slug': 'dialog',
        'content_blocks': [{
          'header': 'What it is',
          'content': 'Script conversations any way you like to answer questions, walk through processes, or just to chat!'
        }],
        'icon': 'dialog.svg',
        'url': 'http://www.ibm.com/smarterplanet/us/en/ibmwatson/developercloud/dialog.html'
      }
    ]
  },

  watch: {
    termsOfService(val, old_val) {
      this.loginUser()

    }

  },

  ready() {
    if (current_user != null) {
      this.current_role = current_user.role

      if ($('.dashboard-anim-overlay').length > 0) {
        this.already_clicked = alreadyClickedApps
      }

      if (current_user.twitter_id == '' || current_user.twitter_id == null) this.askForTwitter()

      this.loadPersonalityInsights()
    }

    this.iframe = $('#main-window-frame')

    this.iframe.css('height', $(window).height() - $('.dashboard__header-inner').height() - $('.dashboard__footer').height())

    this.applications = applications

    if (current_user != null) {
      for (i = 0; i < this.applications.length; i++) {
        if (this.applications[i].name == 'Celebrity Match' && current_user.twitter_id && current_user.twitter_id != null) {
          this.applications[i].iframe_url = {
            developer: 'https://your-celebrity-match.mybluemix.net/like/' + current_user.twitter_id,
            startup: 'https://your-celebrity-match.mybluemix.net/like/' + current_user.twitter_id
          }
        }

      }
    }

  },

  computed: {
    dashboard_header() {
      if (current_user == undefined) return false

      if (current_user.role) {
        for (i = 0; i < this.roles.length; i++) {
          if (this.roles[i].slug == this.current_role) return this.roles[i].intro

        }

        return this.roles[0].intro
      }

    },
    component() {
      for (i = 0; i < this.components.length; i++) {
        if (this.components[i].slug == this.selected_component) return this.components[i]
      }

    },
    application() {
      for (i = 0; i < this.applications.length; i++) {
        if (this.applications[i].id == this.selected_application) return this.applications[i]

      }

    }

  },

  methods: {
    noTwitter() {
      $('#askTwitterModal').modal('hide')
      this.toggle_sunburst = true
      this.personality_insights_loaded = true
    },

    changeApp(app_id, app_name, e) {
      var dashboard = $('.dashboard__main')
      var target = e.target.tagName

      if (target != 'I') {
        if (app_id == this.partially_opened_app) {
          dashboard.removeClass('application-selected')
          dashboard.addClass('application-opened')
          this.selected_application = app_id
          this.trackClick(app_name)
          this.partially_opened_app = null

          this.already_clicked.push(this.application.name)

          console.log(this.application.name)
          console.log(this.application.iframe_url[this.current_role])
        } else {
          dashboard.addClass('application-selected')
          this.partially_opened_app = app_id
        }
      }

    },
    closeApp() {
      var dashboard = $('.dashboard__main')
      dashboard.removeClass('application-selected')
      this.partially_opened_app = null
    },

    isAppVisited(app) {
      if (this.already_clicked.indexOf(app) != -1) {
        return true
      }
      return false
    },
    isActiveComponent(slug) {
      if (this.application.technologies.indexOf(slug) != -1) {
        return true
      }
      return false
    },
    closeCognitive() {
      var dashboardPanelCognitive = $('.panel-cognitive')
      this.selected_component = null
      dashboardPanelCognitive.removeClass('active')
      $('.cogcom__item a').removeClass('active')
    },

    backToHome() {
      var dashboard = $('.dashboard__main')
      var dashboardPanelCognitive = $('.panel-cognitive')

      dashboard.removeClass('application-opened')
      dashboardPanelCognitive.removeClass('active')
      $('.cogcom__item a').removeClass('active')
      this.selected_application = null
    },

    loadPersonalityInsights() {
      var _this = this

      if ($('#sunburstChartContainer').length > 0) {
        if (current_user.twitter_id == null || current_user.twitter_id == '') {
          current_user.twitter_id = 'ibmwatson'
          _this.view_text = "View Watson's Personality Insight"
          _this.pi_title = 'A sample Watson Personality Insight is ready'
        }

        if (current_user.twitter_id) {
          $.get('/api/personality-insights', {
            twitter_id: current_user.twitter_id
          }, function (profile) {
            var chart = new PersonalitySunburstChart('sunburstChartContainer', {
              width: $( window ).width() + 'px',
              height: $( window ).height() + 'px'
            })
            var avatar_image = current_user.twitter_id === 'ibmwatson' ? $('.avatar').data('default') : $('.avatar img').attr('src')
            chart.show(profile, avatar_image)
            _this.personality_insights_loaded = true
          })
        }

      }

    },

    changeComponent(slug) {
      this.selected_component = slug
    },

    trackClick(event_name) { },

    askForTwitter() {
      if ($('.page-content').hasClass('check-for-twitter') && $('#has-twitter-handle').length == 0) {
        $('#askTwitterModal').modal('show')
      }
    },

    saveTwitter() {
      current_user.twitter_id = this.user_inputted_twitter

      var _this = this
      $.post('/user', {
        twitter_id: this.user_inputted_twitter,
        email: this.user_inputted_email
      }, function (data) {
        $('#askTwitterModal').modal('hide')
        location.reload()
      })

    },
    toggleSunburst() {
      this.toggle_sunburst = !this.toggle_sunburst
    },
    loginUser() {
      if (this.logging_in == true)
        return false

      this.logging_in = true
      var _this = this

      $.get('/user', {}, function (data) {
        _this.has_logged_in = true
        _this.logging_in = false

        if (_this.termsOfService === false) {
          $('#main-tooltip').tooltip('show').addClass('animated shake')
        } else {
          location.reload()
        }
      })

    },

    gotoInsights() {
      window.location = '/insights'
    },

    confirmEndSession() {
      this.confirm_end = true
    },

    updateRole(role) {
      this.current_role = role
      this.trackClick('changed to role ' + role)
    },

    goBackToDashboard() {
      this.confirm_end = false
      this.inactive = false
    },

    endSession() {
      window.location = '/logout'
    }
  }
})