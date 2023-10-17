import React, {useState, useEffect, useRef} from 'react';
import { useTranslation } from 'react-i18next';
import style from './CardIntroduction.module.scss';
import {CardBody, Col, Row, Card, Button, CardImg, CardTitle, CardSubtitle, CardText, UncontrolledCarousel} from "reactstrap";
import { GiTechnoHeart } from 'react-icons/gi';
import { BiLibrary, BiSolidPhoneCall } from 'react-icons/bi';
import { BsBookFill } from 'react-icons/bs';
import { HiUserGroup } from 'react-icons/hi';
import { GiSpellBook } from 'react-icons/gi';
import { FcIdea } from 'react-icons/fc';
import { FaLocationDot } from 'react-icons/fa6';
import { AiFillClockCircle } from 'react-icons/ai';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { useSwiper } from 'swiper/react';



const CardIntroduction = () => {

    const { t } = useTranslation();

    const cardData = [
        {
            date: "17 thg 11, 2022",
            title: "The 9 next big things, from fairer refinancing to kid-friendly voice recognition",
            author: "Fast Company",
            icon: <GiTechnoHeart/>,
            image:"https://images.pexels.com/photos/2662116/pexels-photo-2662116.jpeg?cs=srgb&dl=pexels-jaime-reimer-2662116.jpg&fm=jpg"
        },
        {
            date: "17 thg 11, 2022",
            title: "The 9 next big things, from fairer refinancing to kid-friendly voice recognition",
            author: "Fast Company",
            icon: <GiTechnoHeart/>,
            image:"https://images.unsplash.com/photo-1584432743501-7d5c27a39189?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bmljZSUyMHZpZXd8ZW58MHx8MHx8fDA%3D&w=1000&q=80"
        },
        {
            date: "17 thg 11, 2022",
            title: "The 9 next big things, from fairer refinancing to kid-friendly voice recognition",
            author: "Fast Company",
            icon: <GiTechnoHeart/>,
            image:"https://media-cdn.tripadvisor.com/media/photo-s/10/c4/23/16/highland-view-bed-and.jpg"
        },
        {
            date: "17 thg 11, 2022",
            title: "The 9 next big things, from fairer refinancing to kid-friendly voice recognition",
            author: "Fast Company",
            icon: <GiTechnoHeart/>,
            image:"https://cdn.hswstatic.com/gif/10-breathtaking-views-1-orig.jpg"
        },
        {
            date: "17 thg 11, 2022",
            title: "The 9 next big things, from fairer refinancing to kid-friendly voice recognition",
            author: "Fast Company",
            icon: <GiTechnoHeart/>,
            image:"https://ik.imagekit.io/tvlk/blog/2022/10/quan-cafe-view-dep-sai-gon-13.jpg"
        },
        {
            date: "17 thg 11, 2022",
            title: "The 9 next big things, from fairer refinancing to kid-friendly voice recognition",
            author: "Fast Company",
            icon: <GiTechnoHeart/>,
            image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZkQRledRVCysJ2RshnnlDwWCfpilzJbuuyg&usqp=CAU"
        },

    ]

    const quoteData = [
        {
          quote: t('quote_homePage.quote1'),
          author: 'kaywave',
          age: '30',
        },
        {
          quote: t('quote_homePage.quote2'),
          author: 'Katherine_Finger05',
          age: '30',
        },
        {
          quote: t('quote_homePage.quote3'),
          author: 'John',
          age: '25',
        },
      ];

    // slider card
    const [visibleCards, setVisibleCards] = useState(3);
    const [currentIndex, setCurrentIndex] = useState(0);

    const showNextCards = () => {
        const nextIndex = (currentIndex + 1) % cardData.length;
        if (nextIndex <= cardData.length - 3) {
          setCurrentIndex(nextIndex);
        }
      }
    
      const showPrevCards = () => {
        const nextIndex = (currentIndex - 1 + cardData.length) % cardData.length;
        if (currentIndex > 0) {
          setCurrentIndex(nextIndex);
        }
      }

    // slider quote
    const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
        // Automatically move to the next quote
        const nextIndex = (currentQuoteIndex + 1) % quoteData.length;
        setCurrentQuoteIndex(nextIndex);
        }, 5000); // Change quote every 5 seconds (adjust as needed)

        return () => {
        clearInterval(interval); // Clear the interval when the component unmounts
        };
    }, [currentQuoteIndex, quoteData]);

    const swiper = useSwiper();
    const swiperRef = useRef();


    return (
        <div>
            <Card className='bg-white pb-4'>
                <CardBody>
                        <div className='text-center mt-3 mb-5'>
                            <h1 className={style.about}>{t("title_homePage.aboutQuizRoom")}</h1>
                        </div>
 
                        <Row className={style.aboutDetail}>
                            <Col>
                                <h2 className={style.aboutHeadingFirst}>{t("title_homePage.makingEveryStudentUnstoppable")}</h2>
                                <br/>
                                <p>{t("title_homePage.makingEveryStudentUnstoppable_DetailFirst")}</p>
                                <p>{t("title_homePage.makingEveryStudentUnstoppable_DetailSecond")}</p>
                                <br/>
                                <Button color='primary'>{t("btn_homePage.readOutImpactReport")}</Button>
                            </Col>

                            <Col>
                                <img className={style.aboutDetailImg} src='https://img.freepik.com/premium-photo/vertical-shot-happy-group-students-studying-working-together-college-multiracial-caucasian-girls-sitting-table_533057-1396.jpg' alt='image error'/>
                            </Col>
                        </Row>
                </CardBody>
            </Card>

            <Card>
                <CardBody className='bg-white pb-5 pt-5'>
                    <Row className={style.aboutDetailSecond}>
                        <Col className={style.aboutDetailSecond_Col}>
                            <img className={style.aboutDetailImg} src='https://media.istockphoto.com/id/882968778/photo/students-in-library.jpg?s=612x612&w=0&k=20&c=cHNDsDz90k5sqx52GSD4X742J_Li_zmQOM8GxjmLm2g=' alt='image error'/>
                        </Col>

                        <Col>
                            <h2 className={`${style.aboutHeadingSecond} text-black`}>{t("title_homePage.fromSingleClassroomToSchools")}</h2>
                            <br/>
                            <p >{t("title_homePage.fromSingleClassroomToSchools_Detail")}</p>
                        </Col>
                    </Row>            
                </CardBody>
            </Card>

            <Card>
                <CardBody className="bg-white pb-5 pt-5">
                    <Swiper
                        spaceBetween={30}
                        centeredSlides={true}
                        autoplay={{
                        delay: 2500,
                        disableOnInteraction: false,
                        }}
                        modules={[Autoplay, Pagination, Navigation]}
                        className="mySwiper"
                        loop
                    >
                                {quoteData.map((quote, index) => (
                                    <SwiperSlide key={index}>
                                    <div className={style.quoteSection}>
                                    <div>
                                        <p>"{quote.quote}"</p>
                                        <p>~ {quote.author}, age {quote.age} ~</p>
                                    </div>
                                    </div>
                                </SwiperSlide>
                                ))}
                    </Swiper>
                </CardBody>
            </Card>

            <div className='mb-3' style={{marginTop:"6rem"}}>
                <h2 className='fw-bolder mb-3'><FcIdea size={35} className='mb-1'/>&nbsp;{t("advantages_homePage.advantages")}</h2>
                <div className={style.advantagesSection}>
                    <div className={style.advantagesItems}>
                        <div>
                            <div className={style.advantagesItemIcon}>
                                <BiLibrary size={30} />
                            </div>
                        </div>
                        <h4>{t("advantages_homePage.vastContentLibrary")}</h4>
                        <p>{t("advantages_homePage.vastContentLibrary_content")}</p>
                    </div>
                    <div className={style.advantagesItems}>
                        <div>
                            <div className={style.advantagesItemIcon}>
                                <BsBookFill size={30} />
                            </div>
                        </div>
                        <h4>{t("advantages_homePage.customizable_Flashcards")}</h4>
                        <p>{t("advantages_homePage.customizable_Flashcards_content")}</p>
                    </div>
                    <div className={style.advantagesItems}>
                        <div>
                            <div className={style.advantagesItemIcon}>
                                <HiUserGroup size={30} />
                            </div>
                        </div>
                        <h4>{t("advantages_homePage.collaborative_Learning")}</h4>
                        <p>{t("advantages_homePage.collaborative_Learning_content")}</p>
                    </div>
                    <div className={style.advantagesItems}>
                        <div>
                            <div className={style.advantagesItemIcon}>
                                <GiSpellBook size={30} />
                            </div>
                        </div>
                        <h4>{t("advantages_homePage.effective_Study_Strategies")}</h4>
                        <p>{t("advantages_homePage.effective_Study_Strategies_content")}</p>
                    </div>
                </div>
            </div>

            <div className='mt-5 mb-3'>
                <h2 className='fw-bolder'><FcIdea size={35} className='mb-1'/>&nbsp;{t("slider_homePage.Recent_press")}</h2>
                <div className={style.slider}>
                    <label className={style.sliderCardButtonPrev} onClick={() => swiperRef.current?.slidePrev()} style={{fontSize:"3rem"}}>&#x2039;</label>
                        <Swiper
                        onBeforeInit={(swiper) => {
                          swiperRef.current = swiper;
                        }}
                        spaceBetween={30}
                        centeredSlides={true}
                        autoplay={{
                        delay: 2500,
                        disableOnInteraction: false,
                        }}
                        slidesPerView={3}
                        modules={[Autoplay, Pagination, Navigation]}
                        className="mySwiper"
                        loop
                        >
                        {cardData.map((card, index) => (
                        <SwiperSlide key={index}>
                            <Card className={style.card} >
                                <CardImg
                                    alt="Card image"
                                    src={card.image}
                                    top
                                    width="100%"
                                    height="300"
                                />
                                <CardBody>
                                    <CardText>
                                    {card.date}
                                    </CardText>
                                    <CardTitle tag="h5">
                                    {card.title}
                                    </CardTitle>
                                    <CardSubtitle
                                    className="mb-2 text-muted"
                                    tag="h6"
                                    >
                                    {card.icon}
                                    &nbsp; {card.author}
                                    </CardSubtitle>
                                </CardBody>
                            </Card>
                        </SwiperSlide>
                     ))}    
                    </Swiper>
                    
                    <label className={style.sliderCardButtonNext} onClick={() => swiperRef.current?.slideNext()} style={{fontSize:"3rem"}}>&#x203a;</label>                
                </div>
            </div>

            <div className='mb-4'>
                <h2 className='mb-3 fw-bolder'><FcIdea size={35} className='mb-1'/>&nbsp;{t("ourPartners_homePage.ourPartners")}</h2>
                <div className={style.ourPartnerSection}>
                    <div className={style.ourPartnerItem}>
                        <img src="https://quizlet-web.cdn.prismic.io/quizlet-web/6ae6531d-9921-446b-906a-524ae6b7124e_GA+Logo.svg" alt='logo error'/>
                    </div>
                    <div className={style.ourPartnerItem}>
                        <img src="https://quizlet-web.cdn.prismic.io/quizlet-web/5e63e134-0c1e-4022-840a-c7acd8c48905_icon_logo-01.svg" alt='logo error'/>
                    </div>
                    <div className={style.ourPartnerItem}>
                        <img src="https://quizlet-web.cdn.prismic.io/quizlet-web/3b9cdb6a-4f4b-46bf-960d-0875ebd468ce_USV+Logo+final2.svg" alt='logo error'/>
                    </div>
                    <div className={style.ourPartnerItem}>
                        <img src="https://quizlet-web.cdn.prismic.io/quizlet-web/02f0b0af-591e-4dec-b286-bbe85fe2a214_Costanoa-Ventures.svg" alt='logo error'/>
                    </div>
                    <div className={style.ourPartnerItem}>
                        <img src="https://quizlet-web.cdn.prismic.io/quizlet-web/7c0f7042-d266-4ffe-8969-732c55399347_OV+Logofinal.svg" alt='logo error'/>
                    </div>
                    <div className={style.ourPartnerItem}>
                        <img src="https://quizlet-web.cdn.prismic.io/quizlet-web/15f31d47-50f1-45bb-8c84-98b79aff8d85_AV+LogoFINAL1.svg" alt='logo error'/>
                    </div>
                </div>
            </div>

           <Card className='mt-5 mb-4'>
               <CardBody className='bg-white pt-5 pb-5'>
                    <div className={`${style.contactUs}`}>
                        <div className={style.contactUsContent}>
                            <h2 className='fw-bolder'>{t("contactUs_homePage.contactUs")}</h2>
                            <p>{t("contactUs_homePage.contactUs_content")}</p>
                            <div className={style.contactUs_border}></div>
                            <h5 className='mt-2'>
                                <span className='fw-bolder'>{t("contactUs_homePage.phone")}: &nbsp;</span>
                                <span className={`${style.contactUs_span} pb-2`} style={{textDecoration:"underline"}}>1 (232) 252 55 22</span>
                                <br/>
                                <br/>
                                <span className='fw-bolder'>{t("contactUs_homePage.location")}: &nbsp;</span>
                                <span className={`${style.contactUs_span} pt-2`}> 75 Street Sample, WI 63025</span>
                                <br/>
                                <br/>
                                <span className='fw-bolder'>Mail: &nbsp;</span>
                                <span className={`${style.contactUs_span} pt-2`} style={{textDecoration:"underline"}}>Quizroom@company.com</span>
                            </h5>
                        </div>
                        <div className={style.contactUsImage}>
                            <div className={style.contactUsImage_item}>
                                {/* <img src="https://assets.nicepagecdn.com/d2cc3eaa/3925765/images/r444.jpg" alt=""/> */}
                            </div>
                        </div>
                    </div>

                    <div className={style.contactUs_section}>
                        <div className={style.contactUs_section_container}>
                            <div className={style.contactUs_section_containerItem}>
                                <div className={style.contactUs_section_containerItem_block}>
                                    <h5><BiSolidPhoneCall size={22}/> {t("contactUs_homePage.call_us")}</h5>
                                    <p>
                                        <span>&nbsp; 1 (234) 567-891, </span>
                                        <br/>
                                        <span>&nbsp; 1 (234) 987-654</span>
                                    </p>
                                </div>
                            </div>
                            <div className={style.contactUs_section_containerItem}>
                                <div className={style.contactUs_section_containerItem_block}>
                                    <h5><FaLocationDot size={22}/> {t("contactUs_homePage.location_upper")}</h5>
                                    <p>
                                        <span>&nbsp; FPT university</span>
                                    </p>
                                </div>
                            </div>
                            <div className={style.contactUs_section_containerItem}>
                                <div className={style.contactUs_section_containerItem_block}>
                                    <h5><AiFillClockCircle size={22}/> {t("contactUs_homePage.hours")}</h5>
                                    <p>
                                        <span>&nbsp; Monday - Friday, 8am - 11pm</span>
                                        <br/>
                                        <span>&nbsp; Saturday - Sunday, 6am - 8pm</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
               </CardBody>
           </Card>

        </div>
        
    );
}


export default CardIntroduction;
