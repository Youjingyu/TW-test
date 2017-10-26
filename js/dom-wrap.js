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
        if(typeof target_sel === 'function'){
            this.addEventListener(type, function (event) {
                target_sel.call(_this, event);
            })
        } else if(typeof target_sel === 'string'){
            // only execute addEventListener once
            // for listener added later, just use selector as key to cache callback function in this[eventCache]
            var eventCache = type + '_obj';
            // if a listener has been added, there will be eventCache
            if(!this[eventCache]){
                // save listener function
                this[eventCache] = {};
                this[eventCache][target_sel] = callback;
                this.addEventListener(type, function (event) {
                    debugger
                    var target = event.target;
                    // get test function according to selector type
                    var test = testFunc(target_sel);
                    while(target){
                        for(var sel in _this[eventCache]){
                            // if target match the selector
                            if(test(target)){
                                // execute cached callback function
                                _this[eventCache][sel] && _this[eventCache][sel].call(target, event);
                            }
                        }
                        target = target.parentNode;
                        // traverse until the agent element
                        if(target.isEqualNode(_this)){
                            break;
                        }
                    }
                    // the selector of event agent, only surpport tagName, id, and class selector
                    function testFunc(selctor, target) {
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

            // save repeat listener function
            this[eventCache][target_sel] = callback;
        }
    }
})(window.Cr || (window.Cr = {}));