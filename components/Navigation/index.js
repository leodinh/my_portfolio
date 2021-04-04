import React, { useState } from 'react';
import styles from './style.module.scss';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import { Facebook, Instagram, Linkedin } from 'react-feather';
function Navigation() {
    const isRunningDemo = useSelector((state) => state.isDemoRunning);
    const dispatch = useDispatch();
    const router = useRouter();
    const [isChecked, setIsChecked] = useState(false);
    const navigationsList = useState([
        { name: 'HOME', href: '/' },
        { name: 'About me', href: '/about' },
        { name: 'Project', href: '/project' },
        { name: 'Contact Me', href: '/contact' }
    ])[0];
    const navigateLink = async (href) => {
        setIsChecked(false);
        dispatch({
            type: 'START_LOADING'
        });
        await router.push(href, href, { shallow: true });
        dispatch({
            type: 'FINISH_LOADING'
        });
    };
    return (
        <div className={styles['navigation']}>
            <input
                type="checkbox"
                checked={isChecked}
                onChange={() => setIsChecked((prev) => !prev)}
                className={styles['navigation__checkbox']}
                id="navi-toggle"
            />

            <label
                htmlFor="navi-toggle"
                className={`${styles['navigation__button']} ${
                    !isRunningDemo ? styles['navigation-nodelay'] : ''
                }`}>
                <span className={styles['navigation__icon']}>&nbsp;</span>
            </label>

            <div
                className={`${styles['navigation__background']} ${
                    !isRunningDemo ? styles['navigation-nodelay'] : ''
                }`}>
                &nbsp;
            </div>

            <nav className={styles['navigation__nav']}>
                <div className={styles['navigation__container']}>
                    <ul className={styles['navigation__list']}>
                        {navigationsList.map((nav) => (
                            <li className={styles['navigation__item']} key={nav.name}>
                                <div
                                    role="button"
                                    tabIndex={0}
                                    aria-hidden="true"
                                    className={styles['navigation__link']}
                                    onClick={() => navigateLink(nav.href)}>
                                    {nav.name}
                                </div>
                            </li>
                        ))}
                    </ul>
                    <div className={styles['navigation__social']}>
                        <div className={styles['navigation__social_item']}>
                            <a
                                href="https://www.facebook.com/anhtuandn0112/"
                                rel="noreferrer opener"
                                target="_blank">
                                <Facebook />
                            </a>
                        </div>
                        <div className={styles['navigation__social_item']}>
                            <a
                                rel="noreferrer opener"
                                target="_blank"
                                href="https://www.instagram.com/leoo.dinh/">
                                <Instagram />
                            </a>
                        </div>
                        <div
                            className={styles['navigation__social_item']}
                            rel="noreferrer opener"
                            target="_blank">
                            <a
                                rel="noreferrer opener"
                                target="_blank"
                                href="https://www.linkedin.com/in/leotuandinh/">
                                <Linkedin />
                            </a>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    );
}

export default Navigation;
