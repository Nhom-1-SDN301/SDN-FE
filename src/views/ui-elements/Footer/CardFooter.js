import React from 'react';
import style from '../Footer/CardFooter.module.scss';
import { useTranslation } from 'react-i18next';
import { MdPrivacyTip } from 'react-icons/md';
import { BsTwitter, BsFacebook} from 'react-icons/bs';
import { AiFillInstagram, AiFillYoutube } from 'react-icons/ai';
import { FaTiktok } from 'react-icons/fa';

const CardFooter = () => {

    const {t} = useTranslation();

    return (
        <footer className={style.footerSection}>
            <div className={style.footerItem}>
                <div className={style.footerItemChild}>

                    <div className={style.footerItemChildContent}>
                        <h5>{t("aboutUs_Footer.aboutUs")}</h5>
                        <ul>
                            <li>{t("aboutUs_Footer.aboutQuizroom")}</li>
                            <li>{t("aboutUs_Footer.careers")}</li>
                            <li>{t("aboutUs_Footer.AdvertiseWithUs")}</li>
                            <li>{t("aboutUs_Footer.GetTheApp")}</li>
                        </ul>
                    </div>

                    <div className={style.footerItemChildContent}>
                        <h5>{t("forStudents_Footer.forStudents")}</h5>
                        <ul>
                            <li>{t("forStudents_Footer.flashcards")}</li>
                            <li>{t("forStudents_Footer.test")}</li>
                            <li>{t("forStudents_Footer.learn")}</li>
                            <li>{t("forStudents_Footer.solutions")}</li>
                            <li>{t("forStudents_Footer.Q_chat")}</li>
                        </ul>
                    </div>

                    <div className={style.footerItemChildContent}>
                        <h5>{t("forTeachers_Footer.forTeachers")}</h5>
                        <ul>
                            <li>{t("forTeachers_Footer.live")}</li>
                            <li>{t("forTeachers_Footer.checkPoint")}</li>
                            <li>{t("forTeachers_Footer.blog")}</li>
                        </ul>
                    </div>

                    <div className={style.footerItemChildContent}>
                        <h5>{t("resources_Footer.resources")}</h5>
                        <ul>
                            <li>{t("resources_Footer.helpCentre")}</li>
                            <li>{t("resources_Footer.honourCode")}</li>
                            <li>{t("resources_Footer.communityGuide")}</li>
                            <li>{t("resources_Footer.privacy")} &nbsp; <MdPrivacyTip size={18}/></li>
                            <li>{t("resources_Footer.terms")}</li>
                            <li>{t("resources_Footer.adAndCookiePolicy")}</li>
                        </ul>
                    </div>

                    <div className={style.footerItemChildContent}>
                        <h5>{t("language_Footer.languages")}</h5>
                        <ul>
                            <li>{t("language_Footer.english")}</li>
                            <li>{t("language_Footer.vietnamese")}</li>
                        </ul>
                    </div>

                </div>

                <div className={`${style.footerIcon} mt-5`}>
                    <div className={style.footerIconItem}>
                        <div className='mb-1'>
                            <FaTiktok size={20} className={style.icon}/>
                            <BsTwitter size={20} className={style.icon}/>
                            <BsFacebook size={20} className={style.icon}/>
                            <AiFillInstagram size={20} className={style.icon}/>
                            <AiFillYoutube size={20} className={style.icon}/>
                        </div>
                        <div className=''>© 2023 Quizroom, Inc</div>
                    </div>
                    <div>
                        <img width={200} src="https://elearning.tki.org.nz/var/eel/storage/images/media/images/study-time/58524-2-eng-NZ/Study-Time_imagelarge.png" alt='logo error'/>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default CardFooter;
