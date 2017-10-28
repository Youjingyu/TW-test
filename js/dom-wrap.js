(function(Cr, doc){
    Cr.getEle = function (css_selector, parent) {
        parent = parent || doc;
        var dom = null;
        // only return one element for id selector
        if(/^#/.test(css_selector)){
            dom = parent.querySelector(css_selector);
            wrap(dom);
        } else {
            dom = parent.querySelectorAll(css_selector);
            [].forEach.call(dom, function (ele) {
                wrap(ele);
            });
            // allow to add event for element set
            dom.on = function (type, target_sel, callback) {
                [].forEach.call(dom, function(ele) {
                    addEvent.call(ele, type, target_sel, callback);
                });
            }
        }
        return dom;
    }
    Cr.wrap = wrap;

    function wrap(dom) {
        // add method to chain call
        dom.getEle = function (css_selector) {
            // use current element as parent to query children
            return Cr.getEle(css_selector, this);
        }
        dom.on = addEvent;
        dom.addClass = addClass;
        dom.removeClass = removeClass;
        dom.hasClass = hasClass;
        dom.indexOfParent = indexOfParent;
        dom.parent = parent;
        dom.hide = hide;
        dom.show = show;
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
            var eventCache = 'data-' + type + '-obj';
            // if a listener has been added, there will be eventCache
            if(!this[eventCache]){
                // save listener function
                this[eventCache] = {};
                this[eventCache][target_sel] = callback;
                this.addEventListener(type, function (event) {
                    var target = event.target;
                    // get test function according to selector type
                    while(target){
                        for(var sel in _this[eventCache]){
                            // if target match the selector
                            if(testSelector(sel, target)){
                                // execute cached callback function
                                _this[eventCache][sel] && _this[eventCache][sel].call(target, event);
                            }
                        }
                        target = target.parentNode;
                        // traverse until the agent element
                        if(target && target.isEqualNode(_this)){
                            break;
                        }
                    }
                });
            }

            // save repeat listener function
            this[eventCache][target_sel] = callback;
        }
    }
    function removeClass(clas_name) {
        var cur_class = this.getAttribute('class');
        if(cur_class){
            // not yet deal with the spaces left by replacing className
            this.setAttribute('class', cur_class.replace(new RegExp(clas_name), ''));
        }
    }
    function addClass(clas_name) {
        var cur_class = this.getAttribute('class');
        this.setAttribute('class', cur_class ? cur_class + ' ' + clas_name : clas_name);
    }
    function hasClass(clas_name) {
        return new RegExp(clas_name).test(this.getAttribute('class'));
    }
    function indexOfParent() {
        var children = this.parentNode.childNodes;
        // filter text node
        var filter_children = [].filter.call(children, function (ele) {
            return ele.nodeType === 1;
        })
        for(var i = 0; i < filter_children.length; i++){
            if(this.isEqualNode(filter_children[i])){
                return i
            }
        };
        return -1;
    }
    function parent(selector) {
        var parent = this.parentNode;
        if(selector){
            while (parent){
                if(testSelector(selector, parent)){
                    return wrap(parent);
                }
                parent = parent.parentNode;
            };
            return null;
        } else {
            return wrap(parent);
        }
    }
    function hide() {
        this.setAttribute('style', 'display: none');
    }
    function show() {
        // only support block element
        this.setAttribute('style', 'display: block');
    }

    // only surpport tagName, id, and class selector
    function testSelector(selctor, target) {
        if(/^#/.test(selctor)){
            // id selector
            return '#' + target.getAttribute('id') === selctor;
        } else if(/^\./.test(selctor)){
            // class selector
            return new RegExp(selctor.replace('.', '')).test(target.className);
        } else {
            // tagname selector
            return target.tagName && target.tagName.toLowerCase() === selctor;
        }
    }
})(window.Cr || (window.Cr = {}), document);