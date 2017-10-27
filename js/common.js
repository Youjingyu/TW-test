(function (Cr) {
    // config js hook
    var js_hook = {
        agent_list_templ: 'agent_list_templ',
        summary_templ: 'summary_templ',
        history_list_templ: 'history_list_templ',
        agent_list: '#agent_list',
        add_res: '.js-add-res',
        delete_res: '.cr-main-item-delete',
        dialog: '.cr-main-add-dialog',
        dialog_close: '.js-dialog-close',
        dialog_add: '.js-dialog-add'
    }

    var $agent_list = Cr.getEle(js_hook.agent_list);
    // delete resources
    $agent_list.on('click', js_hook.delete_res, function () {
        var parrent = this.parentNode;
        var delete_list_index = Cr.wrap(parrent.parentNode.parentNode.parentNode.parentNode).indexOfParent();
        var delete_res_index = Cr.wrap(parrent).indexOfParent();
        if(delete_list_index > -1 && delete_res_index > -1){
            var type = Cr.getEle('#main_nav').getEle('.active')[0].getAttribute('data-agent-type');
            Cr.deleteRes(type, delete_list_index, delete_res_index);
            parrent.parentNode.removeChild(parrent);
        }
    });
    // show dialog
    $agent_list.on('click', js_hook.add_res, function () {
        this.parentNode.nextSibling.nextSibling.setAttribute('style', 'display: block');
    });

    var dialogs = Cr.getEle(js_hook.dialog);
    Cr.refreshList = function (agent_type) {
        var data = Cr.getData();
        var list_data, summary_data, hisory_data;
        if(agent_type === 'all'){
            list_data = data['physical']['agents'].concat(data['virtual']['agents']);
            hisory_data = data['physical']['history'].concat(data['virtual']['history']);
        } else {
            list_data = data[agent_type]['agents'];
            hisory_data = data[agent_type]['history'];
        }
        summary_data = agentSummary(list_data);
        // init agents information
        Cr.render(js_hook.agent_list_templ, list_data);
        Cr.render(js_hook.summary_templ, summary_data);
        Cr.render(js_hook.history_list_templ, hisory_data);

        // hide dialog
        dialogs.on('click', js_hook.dialog_close, function () {
            this.parentNode.parentNode.setAttribute('style', 'display: none');
        });
        // dialog add
        dialogs.on('click', js_hook.dialog_add, function () {
            this.parentNode.parentNode.setAttribute('style', 'display: none');
        });

        function agentSummary(data) {
            var summary = {
                building: 0,
                idle: 0
            }
            data.forEach(function (ele) {
                if(ele.status === 'building'){
                    summary.building ++;
                } else if(ele.status === 'idle'){
                    summary.idle ++;
                }
            });
            return summary;
        }
    };
})(window.Cr || (window.Cr = {}))