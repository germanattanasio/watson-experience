$(document).ready(function () {

  $('#main-tooltip').tooltip();
  $('#window-iframe').css('width', $(window).width() - $('.title-button').width());

  var clickEvent = 'click',
    dashboardOverlay = $('.dashboard-anim-overlay'),
    dashboard = $('.dashboard__main'),
    dashboardApp = dashboard.find('.dashboard-apps'),
    dashboardAppsWrapper = dashboardApp.find('.dashboard-apps__wrapper'),
    dashboardAppWrap = dashboardApp.find('.apps-wrap'),
    windowHeight = $(window).height(),
    windowWidth = $(window).width(),
    dashboardFooterHeight = $('.dashboard__footer').height(),
    dashboardHeaderHeight = $('.dashboard__header').height(),
    dashboardAppStack = dashboardAppWrap.find('.apps-stack'),
    dashboardAppItem = dashboardAppStack.find('.apps-stack__item'),
    dashboardPanelLeft = $('.dashboard-panel.dashboard-panel__left'),
    dashboardPanelRight = $('.dashboard-panel.dashboard-panel__right'),
    elNavLeft = $('.dashboard-apps-nav.nav-left'),
    elNavRight = $('.dashboard-apps-nav.nav-right'),
    dashboardPanelCognitive = $('.panel-cognitive'),
    dbaSlideActive = 1,
    dbaSlideCount = dashboardAppStack.length,
    dbaSlideSpeed = .45,
    appSize = 160,
    appGutter = 30,
    appSizeFull = appSize + appGutter,
    appGutterHalf = appGutter / 2,
    dbaSlideMeth = Power2.EaseInOut,
    dashboardIframe = $('.dashboard-iframe'),
    elAppStack1 = dashboardAppWrap.find('#apps-stack-1'),
    elAppStack2 = dashboardAppWrap.find('#apps-stack-2'),
    elAppStack3 = dashboardAppWrap.find('#apps-stack-3'),
    elAppItems1_1 = elAppStack1.find('.apps-stack__item:nth-child(1)'),
    elAppItems1_2 = elAppStack1.find('.apps-stack__item:nth-child(2)'),
    elAppItems1_3 = elAppStack1.find('.apps-stack__item:nth-child(3)'),
    elAppItems1_4 = elAppStack1.find('.apps-stack__item:nth-child(4)'),
    elAppItems2_1 = elAppStack2.find('.apps-stack__item:nth-child(1)'),
    elAppItems2_2 = elAppStack2.find('.apps-stack__item:nth-child(2)'),
    elAppItems2_3 = elAppStack2.find('.apps-stack__item:nth-child(3)'),
    elAppItems2_4 = elAppStack2.find('.apps-stack__item:nth-child(4)'),
    elAppItems3_1 = elAppStack3.find('.apps-stack__item:nth-child(1)'),
    elAppItems3_2 = elAppStack3.find('.apps-stack__item:nth-child(2)'),
    elAppItems3_3 = elAppStack3.find('.apps-stack__item:nth-child(3)'),
    elAppItems3_4 = elAppStack3.find('.apps-stack__item:nth-child(4)');

  function handlerPanels() {
    dashboardPanelLeft.attr('data-state', 'default');
    setTimeout(function () {
      dashboardPanelRight.attr('data-state', 'default');
    }, 500);
  }

  function initialAnimation() {

    var tl01 = new TimelineMax({ repeat:0 }),
      elGreetings = $('.dashboard__header .greeting'),
      elHeaderTitle = $('.dashboard__header .header__title'),
      elFooterLogos = $('.dashboard__footer .footer-logos'),
      elFooterSlide = $('.dashboard__footer .footer-slide'),

      appRow1 = appGutterHalf,
      appRow2 = appSizeFull + appGutterHalf,
      appRow3 = appSizeFull * 2 + appGutterHalf,
      app1PosY = windowHeight * 0.32 - 30,
      app2PosY = windowHeight * 0.40 - 30,
      app3PosY = windowHeight * 0.48 - 30
      ;


    tl01
            .set(dashboardOverlay, { display:'none' })
            .from(elGreetings, 0.5, { left:'+=250px', opacity:0, repeat:0 }, 0)
            .from(elHeaderTitle, 0.5, { left:'+=250px', opacity:0, repeat:0 }, 0.3)
            .from(elFooterLogos, 0.5, { left:'+=250px', opacity:0, repeat:0 }, 0.6)
            .from(elFooterSlide, 0.5, { left:'+=250px', opacity:0, repeat:0 }, 0.9)
            .add('pos1', .5)
            .add('pos2', 1)
            .add('pos3', 1.5)
            .add('pos4', 2)
            .add('pos5', 2.5)
            .add('pos6', 3)
            .add('pos7', 3.5)
            .add('pos8', 4)
            .add('pos9', 4.5)
            // .from(dashboardPanelLeft, 0.7, {left:"100%", opacity:0}, 1.2)
            // .from(dashboardPanelRight, 0.5, {left:"100%", opacity:0}, 1.8)
            // .from(elNavLeft, 0.7, {left:"100%", opacity:0}, 2.4)
            // .from(dashboardAppWrap, 0.5, {left:"100%", opacity:0}, 2.8)
            // .from(elNavRight, 0.5, {left:"+=200", opacity:0}, 3.2)
            // .from(dashboardApp, 0.3, {borderBottomWidth: 0}, 3.2)
            .from(elAppItems1_1, 0.3, { left:'+=50' }, 'pos3')
            .from(elAppItems1_2, 0.3, { left:'+=100' }, 'pos3')
            .from(elAppItems1_3, 0.3, { left:'+=150' }, 'pos3')
            .from(elAppItems1_4, 0.3, { left:'+=200' }, 'pos3')
            .fromTo(elAppStack1, 0.5, { left:'500px', top:appRow1, opacity:0 }, { left: '0px', top:appRow1, opacity:1 }, 'pos3')
            .from(elAppItems2_1, 0.3, { left:'+=50' }, 'pos2')
            .from(elAppItems2_2, 0.3, { left:'+=100' }, 'pos2')
            .from(elAppItems2_3, 0.3, { left:'+=150' }, 'pos2')
            .from(elAppItems2_4, 0.3, { left:'+=200' }, 'pos2')
            .fromTo(elAppStack2, 0.5, { left:'500px', top:appRow2, opacity:0 }, { left: '0px', top:appRow2, opacity:1 }, 'pos2')
            .from(elAppItems3_1, 0.3, { left:'+=50' }, 'pos1')
            .from(elAppItems3_2, 0.3, { left:'+=100' }, 'pos1')
            .from(elAppItems3_3, 0.3, { left:'+=150' }, 'pos1')
            .from(elAppItems3_4, 0.3, { left:'+=200' }, 'pos1')
            .fromTo(elAppStack3, 0.5, { left:'500px', top:appRow3, opacity:0 }, { left: '0px', top:appRow3, opacity:1 }, 'pos1')
            // .to(elAppStack3, 0.5, {top:"0px"}, "pos4")
            // .to(elAppStack3, 0.5, {left:"100%"}, "pos5")
            // .to(elAppStack2, 0.5, {top:"0px"}, "pos6")
            // .to(elAppStack2, 0.5, {left:"100%"}, "pos7")
            // .to(elAppStack1, 0.5, {top:"0px"}, "pos8")
            // .set(dashboardPanelLeft, {left: "auto", zIndex: 10}, "+=0.1")
            // .set(dashboardPanelRight, {left: "auto", zIndex: 10}, "+=0.1")
            // .set(elAppStack1, {position:"relative", left:"0px"})
            // .set(elAppStack2, {position:"relative", left:"0px"})
            // .set(elAppStack3, {position:"relative", left:"0px"})
            // .set(elAppItems1_1, {className:"+=active-app"})
            // .from(dashboardIframe, 0.5, {scale:0.1, opacity:0, onComplete:handlerPanels}, "+=0.1")
        ;
  }

  function adjustDashboardApp() {
    var dashboardAppsWrapperWidth = appSizeFull * 4,
      dashboardAppsWrapperHeight = appSizeFull * 3,
      dashboardAppsWrapperTop = ((windowHeight - dashboardAppsWrapperHeight - dashboardHeaderHeight - dashboardFooterHeight) / 2);

    elAppItems1_1.css({ 'left':appGutterHalf });
    elAppItems1_2.css({ 'left':appSizeFull + appGutterHalf });
    elAppItems1_3.css({ 'left':appSizeFull * 2 + appGutterHalf });
    elAppItems1_4.css({ 'left':appSizeFull * 3 + appGutterHalf });

    elAppItems2_1.css({ 'left':appGutterHalf });
    elAppItems2_2.css({ 'left':appSizeFull + appGutterHalf });
    elAppItems2_3.css({ 'left':appSizeFull * 2 + appGutterHalf });
    elAppItems2_4.css({ 'left':appSizeFull * 3 + appGutterHalf });

    elAppItems3_1.css({ 'left':appGutterHalf });
    elAppItems3_2.css({ 'left':appSizeFull + appGutterHalf });
    elAppItems3_3.css({ 'left':appSizeFull * 2 + appGutterHalf });
    elAppItems3_4.css({ 'left':appSizeFull * 3 + appGutterHalf });


    dashboardAppsWrapper.css({ 'width': dashboardAppsWrapperWidth, 'height': dashboardAppsWrapperHeight, 'top': dashboardAppsWrapperTop });
        // dashboardAppStack.css({'width': dashboardAppWrapWidth});
        // var dashboardAppContainerWidth = dashboardAppWrapWidth*dashboardAppStack.length;
        // dashboardAppContainer.css({'width': dashboardAppContainerWidth});
        // dashboardAppItem.css({'width': dashboardAppItemWidth});
  }

  function dashboardAppsNavigate(direction) {
    if (direction == 'next') {
      dbaSlideActive ++;
      if (dbaSlideActive > dbaSlideCount) dbaSlideActive = 1;
    } else {
      dbaSlideActive --;
      if (dbaSlideActive == 0) dbaSlideActive = dbaSlideCount;
    }

    var dbaWrapWidth = dashboardAppWrap.width(),
      xTarget = (dbaWrapWidth * (dbaSlideActive - 1)) * -1;
    TweenMax.to(dashboardAppContainer, dbaSlideSpeed, { x: xTarget, ease: dbaSlideMeth/* , onComplete: slideDone*/ });
  }

  $('.dashboard-apps-nav.nav-left').on(clickEvent, function (e) {
    e.preventDefault();
    dashboardAppsNavigate('prev');
  });

  $('.dashboard-apps-nav.nav-right').on(clickEvent, function (e) {
    e.preventDefault();
    dashboardAppsNavigate('next');
  });

  $(document).on(clickEvent, '.button__close-app', function (e) {
    e.preventDefault();
    dashboard.removeClass('application-selected');
    $('.apps-stack__item').removeClass('active');
  });

  $('.dashboard-accordion .accordion-item__header a').on(clickEvent, function (e) {
    e.preventDefault();
    var $this = $(this),
      parent = $this.closest('.accordion-item');

    if (!parent.hasClass('active')) {
      var href = $this.attr('href');
      $('.accordion-item.active').removeClass('active');
      parent.addClass('active');
    } else {
      parent.removeClass('active');
    }
  });

  $('.cogcom__item a').on(clickEvent, function (e) {
    e.preventDefault();
    var $this = $(this),
      panel = $('.panel-cognitive'),
      href = $this.attr('href');

    $('.cogcom__item a.active').removeClass('active');
    $this.addClass('active');
    panel.addClass('active');

  });

  $('.dashboard-apps-overlay').on(clickEvent, function (e) {
    e.preventDefault();
    dashboard.removeClass('application-selected');
    $('.apps-stack__item').removeClass('active');
  });

  $('.dashboard-panel .dashboard-panel__title a').click(function (e) {
    e.preventDefault();
    var $this = $(this),
      parent = $this.closest('.dashboard-panel'),
      state = parent.attr('data-state');

    if (state == 'default') {
      var stateNew = 'collapsed',
        bodyClass = false;

    } else {
      var stateNew = 'default',
        bodyClass = true;
    }

    parent.attr('data-state', stateNew);
    if (parent.hasClass('dashboard-panel__left')) {
      if (!bodyClass) {
        dashboard.addClass('panel-left-collapsed');
      } else {
        dashboard.removeClass('panel-left-collapsed');
      }

    }
  });

  adjustDashboardApp();
  initialAnimation();

  $(window).on('resize', function () {
    adjustDashboardApp();
  });
});
