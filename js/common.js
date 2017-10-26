(function () {
    // config js hook
    var js_hook = {
        agent_list_templ: 'agent_list_templ',
        agent_list: '#agent_list',
        add_res: '.js-add-res'
    }
    // init agents list
    Cr.render(js_hook.agent_list_templ, Cr.getData().agents.physical);
    // add event listener
    var $agent_list = Cr.getEle(js_hook.agent_list);
    $agent_list.on('click', js_hook.add_res, function () {
        this.parentNode.nextSibling.nextSibling.setAttribute('style', 'display: block');
    });
})()