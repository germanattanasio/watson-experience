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
                name: 'DeveloperWorks',
                link: 'http://www.ibm.com/developerworks/'
            }
        }, {
            'name': 'Entrepreneur',
            'slug': 'startup',
            'title': 'launch',
            'intro': 'Cognitive thinks so you can outthink challenges.',
            'definition': 'Launch your next best idea or business, with agility and economy.',
            'promo': {
                'name': 'Global Entrepreneur program',
                'link': 'https://www-01.ibm.com/software/info/ecod/cloudoffer/startup.html'
            }
        }, {
            'name': 'Millennial',
            'slug': 'millennial',
            'title': 'innovate',
            'intro': 'Cognitive thinks so you can outthink impossible.',
            'definition': 'Innovate and collaborate with purpose. You can change the world.',
            'promo': {
                'name': 'Go deep on Watson Trend',
                'link': 'https://ibmwatsontrend.com/#/about'
            }
        }, {
            'name': 'Business Leader',
            'slug': 'company leader',
            'title': 'lead',
            'intro': 'Cognitive thinks so you can outthink competitors.',
            'definition': 'Lead the way with confidence in an ever-evolving world.',
            'promo': {
                'name': 'Watson Discovery Advisor for Life Sciences',
                'link': 'http://www.ibm.com/smarterplanet/us/en/ibmwatson/discovery-advisor.html'
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
                'name': 'Vision',
                'slug': 'vision',
                'content_blocks': [{
                    'header': 'What it is',
                    'content': "AlchemyVision employs our deep learning innovations to understand a picture's content and context"
                }],
                'icon': 'vision.svg',
                'url': 'http://www.ibm.com/smarterplanet/us/en/ibmwatson/developercloud/alchemy-vision.html'
            }, {
                'name': 'AlchemyData News',
                'slug': 'alchemy',
                'content_blocks': [{
                    'header': 'What it is',
                    'content': "Provides news and blog content enriched with natural language processing to allow for highly targeted search and trend analysis. Now you can query the world's news sources and blogs like a database."
                }],
                'icon': 'cogc-03.svg',
                'url': 'http://www.ibm.com/smarterplanet/us/en/ibmwatson/developercloud/alchemy-data-news.html'
            }, {
                'name': 'IoT',
                'slug': 'iot',
                'content_blocks': [{
                    'header': 'What it is',
                    'content': "IBM's new Watson Internet of Things (IoT) is a cognitive system that learns from, and infuses intelligence into the physical world."
                }],
                'icon': 'watson.png',
                'url': 'http://www.ibm.com/internet-of-things/'
            }, {
                'name': 'Benchmark Live',
                'slug': 'benchmark_live',
                'content_blocks': [{
                    'header': 'What it is',
                    'content': 'Benchmark Live gives you instant access to online shopping trends.'
                }],
                'icon': 'watson.png',
                'url': 'http://ibmbenchmarklive.mybluemix.net/#/home'
            }, {
                'name': 'Analytics',
                'slug': 'analytics',
                'content_blocks': [{
                    'header': 'What it is',
                    'content': 'Get data discovery capabilities and visualizations you can use to understand your business on your own. No data science or advanced modeling skills are required.'
                }],
                'icon': 'watson.png',
                'url': 'http://www.ibm.com/analytics/watson-analytics/'
            }, {
                'name': 'Trend',
                'slug': 'trends',
                'content_blocks': [{
                    'header': 'What it is',
                    'content': 'IBM Watson Retail Trends is the gift guide of holiday heroes, forecasting the best sellers and giving consumers deep shopping insights.'
                }],
                'icon': 'trend.gif',
                'url': 'http://www-01.ibm.com/software/marketing-solutions/watson-trend/'
            }, {
                'name': 'Weather Company Data',
                'slug': 'weather_company_data',
                'content_blocks': [{
                    'header': 'What it is',
                    'content': 'The Weather Company, an IBM Business, offers a world-class data cloud platform, the world’s largest and most accurate weather data sets and a talented team of data scientists, meteorologists, developers and other experts who will enhance IBM’s cognitive solutions portfolio.'
                }],
                'icon': 'weather.png',
                'url': 'http://www.ibm.com/analytics/us/en/business/weather-insight.html'
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
                'name': 'Health',
                'slug': 'health',
                'content_blocks': [{
                    'header': 'What it is',
                    'content': 'IBM Watson Health is pioneering a new partnership between humanity and technology with the goal of transforming global health. '
                }],
                'icon': 'watson.png',
                'url': 'http://www.ibm.com/smarterplanet/us/en/ibmwatson/health/'
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
                'url': 'https://console.ng.bluemix.net/catalog/?cm_mc_uid=89150105052414551077904&cm_mc_sid_50200000=1455046423'
            }, {
                'name': 'Discovery Advisor',
                'slug': 'discovery_advisor',
                'content_blocks': [{
                    'header': 'What it is',
                    'content': 'Watson Discovery Advisor makes connections and draws relationships between data sets.'
                }],
                'icon': 'watson.png',
                'url': 'http://www.ibm.com/smarterplanet/us/en/ibmwatson/discovery-advisor.html'
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
                if (this.applications[i].name == 'image insights' && current_user.twitter_id && current_user.twitter_id != null) {
                    this.applications[i].iframe_url = {
                        developer: 'http://impressions.mybluemix.net/like/' + current_user.twitter_id,
                        'startup': 'http://impressions.mybluemix.net/like/' + current_user.twitter_id,
                        millennial: 'http://impressions.mybluemix.net/like/' + current_user.twitter_id,
                        'company leader': 'http://impressions.mybluemix.net/like/' + current_user.twitter_id
                    }
                }

                if (this.applications[i].name == 'entrepreneur match' && current_user.twitter_id && current_user.twitter_id != null) {
                    this.applications[i].iframe_url = {
                        developer: 'http://match.mybluemix.net/like/' + current_user.twitter_id,
                        'startup': 'http://match.mybluemix.net/like/' + current_user.twitter_id,
                        millennial: 'http://match.mybluemix.net/like/' + current_user.twitter_id,
                        'company leader': 'http://match.mybluemix.net/like/' + current_user.twitter_id
                    }
                }

                if (this.applications[i].name == 'celebrity match' && current_user.twitter_id && current_user.twitter_id != null) {
                    this.applications[i].iframe_url = {
                        developer: 'https://your-celebrity-match.mybluemix.net/like/' + current_user.twitter_id,
                        'startup': 'https://your-celebrity-match.mybluemix.net/like/' + current_user.twitter_id,
                        millennial: 'https://your-celebrity-match.mybluemix.net/like/' + current_user.twitter_id,
                        'company leader': 'https://your-celebrity-match.mybluemix.net/like/' + current_user.twitter_id
                    }
                }

                if (this.applications[i].name == 'UA fast physical' && current_user.twitter_id && current_user.twitter_id != null) {
                    this.applications[i].iframe_url = {
                        developer: 'https://blog.underarmour.com/ua-fast-physical/store/sxsw?first_name=' + current_user.first_name + '&last_name=' + current_user.last_name + '&email=' + current_user.email,
                        'startup': 'https://blog.underarmour.com/ua-fast-physical/store/sxsw?first_name=' + current_user.first_name + '&last_name=' + current_user.last_name + '&email=' + current_user.email,
                        millennial: 'https://blog.underarmour.com/ua-fast-physical/store/sxsw?first_name=' + current_user.first_name + '&last_name=' + current_user.last_name + '&email=' + current_user.email,
                        'company leader': 'https://blog.underarmour.com/ua-fast-physical/store/sxsw?first_name=' + current_user.first_name + '&last_name=' + current_user.last_name + '&email=' + current_user.email
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
                /* finish opening */
                if (app_id == this.partially_opened_app) {
                    dashboard.removeClass('application-selected')
                    dashboard.addClass('application-opened')
                    this.selected_application = app_id
                    this.trackClick(app_name)
                    this.partially_opened_app = null

                    this.already_clicked.push(this.application.name)

                    console.log(this.application.name)
                    console.log(this.application.iframe_url[this.current_role])
                    if (this.application.name == 'sports insight central') {
                        if (!$('.dashboard-panel .dashboard-panel__title').data('state')) {
                            $('.dashboard-panel .dashboard-panel__title a').trigger('click')
                        }

                    }

                } else {
                    console.log('first click')
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
                    $.get('/api/personality-insights', { twitter_id : current_user.twitter_id }, function(profile) {
                        var chart = new PersonalitySunburstChart('sunburstChartContainer', {
                            width: '1000px',
                            height: '750px'
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

        trackClick(event_name) {
            $.post('/tracker', {
                name: event_name
            }, function(data) {})

        },

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
            }, function(data) {
                $('#askTwitterModal').modal('hide')
                location.reload()

            })

        },
        toggleSunburst() {
            this.toggle_sunburst = !this.toggle_sunburst
        },
        loginUser() {
            if (this.logging_in == true) return false

            this.logging_in = true

            var _this = this

            $.get('/user', {}, function(data) {
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