import { NavLink } from 'react-router-dom';

export function NavigationTab(props: { to: string; label: string }) {
  return (
    <NavLink
      to={props.to}
      replace={true}
      className={({ isActive }) =>
        [
          'px-4 py-2 hover:bg-primary-60 text-main hover:text-white',
          'rounded-md hover:scale-105 transition-transform',
          isActive
            ? '!bg-blue text-white'
            : '',
        ].join(' ')
      }
    >
      {props.label}
    </NavLink>
  );
}

export default NavigationTab;
