
export default ({ href, name, route, activeLink }) => {
	const clz = route.path === activeLink ? 'active' : ''; 
	return <h2 ><a href={href} className={clz}>{ name }</a></h2>
}