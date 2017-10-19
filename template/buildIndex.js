/* eslint-disable */


<% for (var i = 0; i < ComponentNames.length; i++) {%>
  import <%= ComponentNames[i] %> from './lib/<%= ComponentNames[i] %>';<% } %>


let __SALT_VERSION__;
webpack_set_version

const __SALT_BUNDLE__ = {
  version: __SALT_VERSION__,
  <% for (var i = 0; i < ComponentNames.length; i++) {%>
  <%= ComponentNames[i] %>,<% } %>
};

if (typeof window !== 'undefined') {
  window.TingleUI = __SALT_BUNDLE__;
}
export default __SALT_BUNDLE__;