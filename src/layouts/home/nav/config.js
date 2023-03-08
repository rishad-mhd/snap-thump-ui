// component
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfig = [
  {
    title: 'Create',
    path: '/thumbnail/create',
    icon: icon('ic_create'),
  },
  {
    title: 'List',
    path: '/thumbnail/list',
    icon: icon('ic_list'),
  },
  {
    title: 'About',
    path: '/#',
    icon: icon('ic_about'),
  },
  {
    title: 'Contact us',
    path: '/#',
    icon: icon('ic_contact'),
  },
];

export default navConfig;
