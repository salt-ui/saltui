import native from './native';
import h5 from './index';

const ua = window.navigator.userAgent;
const isDD = /DingTalk/i.test(ua);

const Mix = isDD ? native : h5;


export default Mix;
