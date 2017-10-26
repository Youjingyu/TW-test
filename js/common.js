(function (Cr) {
    // config js hook
    var js_hook = {
        agent_list_templ: 'agent_list_templ',
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
        Cr.deleteRes('');
        parrent.parentNode.removeChild(parrent);
    });
    // show dialog
    $agent_list.on('click', js_hook.add_res, function () {
        this.parentNode.nextSibling.nextSibling.setAttribute('style', 'display: block');
    });

    var dialogs = Cr.getEle(js_hook.dialog);
    Cr.refreshList = function (agent_type) {
        var data = Cr.getData();
        var list_data = agent_type === 'all' ? data['physical'].concat(data['virtual']) : data[agent_type]
        // init agents list
        Cr.render(js_hook.agent_list_templ, list_data);
        // hide dialog
        dialogs.on('click', js_hook.dialog_close, function () {
            this.parentNode.parentNode.setAttribute('style', 'display: none');
        });
        // dialog add
        dialogs.on('click', js_hook.dialog_add, function () {
            this.parentNode.parentNode.setAttribute('style', 'display: none');
        });
    };
})(window.Cr || (window.Cr = {}))