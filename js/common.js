(function () {
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
    // init agents list
    Cr.render(js_hook.agent_list_templ, Cr.getData().agents.physical);

    var $agent_list = Cr.getEle(js_hook.agent_list);
    // delete resources
    $agent_list.on('click', js_hook.delete_res, function () {
        var parrent = this.parentNode;
        parrent.parentNode.removeChild(parrent);
    });

    var dialogs = Cr.getEle(js_hook.dialog);
    // show dialog
    $agent_list.on('click', js_hook.add_res, function () {
        this.parentNode.nextSibling.nextSibling.setAttribute('style', 'display: block');
    });
    // hide dialog
    dialogs.on('click', js_hook.dialog_close, function () {
        this.parentNode.parentNode.setAttribute('style', 'display: none');
    });
    // dialog add
    dialogs.on('click', js_hook.dialog_add, function () {
        this.parentNode.parentNode.setAttribute('style', 'display: none');
    });
})()