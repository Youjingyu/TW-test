(function(Cr){
    Cr.getEle = function (css_selector) {
        var dom;
        // only return one element for id selector
        if(/^#/.test(css_selector)){
            dom = document.querySelector(css_selector);
            // add getEle and addEvent method to chain call
            dom.getEle = Cr.getEle;
            dom.on = addEvent;
        } else {
            dom = document.querySelectorAll(css_selector);
            // add getEle and addEvent method for each elemrnt to chain call
            [].forEach.call(dom, function (ele) {
                ele.getEle = Cr.getEle;
                ele.on = addEvent;
            });
            // allow to add event for element set
            dom.on = function (type, target_sel, callback) {
                [].forEach.call(dom, add);
                function add(ele) {
                    addEvent.call(ele, type, target_sel, callback);
                };
            }
        }
        return dom;
    }
    function addEvent(type, target_sel, callback) {
        var _this = this;
        this.addEventListener(type, function (event) {
            if(typeof target_sel === 'function'){
                target_sel.call(_this, event);
            } else if(typeof target_sel === 'string'){
                var target = event.target;
                var test = testFunc(target_sel);
                while(target){
                    // if target match the selector
                    if(test(target)){
                        callback && callback.call(target, event);
                    }
                    target = target.parentNode;
                    // traverse until the agent element
                    if(target.isEqualNode(this)){
                        break;
                    }
                }
            }
            // the selector of event agent, only surpport tagName, id, and class selector
            function testFunc(selctor) {
                var sel;
                if(/^#/.test(selctor)){
                    // id selector
                    sel = selctor.replace('#', '')
                    return function (target) { return target.getAttribute('id') === sel }
                } else if(/^\./.test(selctor)){
                    // class selector
                    sel = selctor.replace('.', '');
                    var reg = new RegExp(sel)
                    return function (target) { return reg.test(target.className) }
                } else {
                    // tagname selector
                    return function (target) { return target.tagName.toLowerCase() === selctor }
                }
            }
        });

    }
})(window.Cr || (window.Cr = {}));