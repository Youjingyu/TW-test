(function(Cr){
    Cr.getEle = function (css_selector) {
        var dom;
        // only return one element for id selector
        if(/^#/.test(css_selector)){
            dom = document.querySelector(css_selector);
            dom.getEle = Cr.getEle;
            dom.addEvent = addEvent;
        } else {
            dom = document.querySelectorAll(css_selector);
            // add getEle and addEvent method for each elemrnt to chain call
            [].forEach.call(dom, function (ele) {
                ele.getEle = Cr.getEle;
                ele.addEvent = addEvent;
            });
        }
        return dom;
    }
    function addEvent(type, target_sel, callback) {
        this.addEventListener(type, function (event) {
            if(typeof target_sel === 'function'){
                target_sel();
            } else if(typeof target_sel === 'string'){
                // event agent, only surpport tagName, id, and class selector
                target_sel = target_sel.replace(/\.|#/, '');
                var target = event.target;
                // if target match the selector
                if(target.tagName.toLowerCase() === target_sel ||
                    target.getAttribute('id') === target_sel ||
                    new RegExp(target_sel).test(target.className)){
                    callback && callback();
                }
            }
        })
    }
})(window.Cr || (window.Cr = {}));