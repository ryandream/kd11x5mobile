import Vue from 'vue';

import Promptbox from './Promptbox';
import Alert from './Alert';
import Pager from './Pager';
// import VueFlatpickr from 'vue-flatpickr';
// import 'vue-flatpickr/theme/flatpickr.min.css';

Vue.component('mod-promptbox', Promptbox);
Vue.component('mod-alert', Alert);
Vue.component('mod-pager', Pager);

Vue.prototype.$promptbox = function(id){
    this.$root.$children[0].$refs.promptbox.open(id);
};
Vue.prototype.$alert = function(options){
    this.$root.$children[0].$refs.alert.open(options);
};
Vue.prototype.$error = function(options){
    options.type = "error";
    options.title = '错误！';
    this.$root.$children[0].$refs.alert.open(options);
};
Vue.prototype.$success = function(options){
    options.type = "success";
    options.title = "成功！";
    this.$root.$children[0].$refs.alert.open(options);
};
Vue.prototype.$info = function(options){
    options.type = "info";
    options.title = "温馨提示！";
    this.$root.$children[0].$refs.alert.open(options);
};

// Vue.use(VueFlatpickr);