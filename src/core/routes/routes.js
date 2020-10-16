import LandingPage from '../../ui/components/LandingPage';
import VolumesList from '../../ui/components/VolumesList';

export default () => [
    {
        path: '/search',
        component: VolumesList,
        exact: true
    }, {
        path: '/',
        component: LandingPage,
        exact: true
    }
];