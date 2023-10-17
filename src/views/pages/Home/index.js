// ** Reactstrap import
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  CardText,
  CardLink,
  CardSubtitle,
  Col,
  Row,
} from "reactstrap";

// ** Third Party Components
import ReactPaginate from 'react-paginate'

// ** Components import
import CardCongratulations from "../../ui-elements/cards/advance/CardCongratulations";
import CardTerm from "../../ui-elements/cards/advance/CardTerm";
import BreadCrumbsPage from "@components/breadcrumbs";
import { useTranslation } from "react-i18next";
import CardIntroduction from "../../ui-elements/Intro/CardIntroduction";
import CardFooter from "../../ui-elements/Footer/CardFooter";
import style from '../../ui-elements/cards/advance/CardFeatures.module.scss';
import StatsVertical from '@components/widgets/stats/StatsVertical'

import {
  Eye,
  Heart,
  Award,
  MessageSquare,
  Book,
  UserCheck
} from 'react-feather'


const Home = () => {
  // ** Hooks
  const { t } = useTranslation();

  return (
    <div>
      <BreadCrumbsPage title={t("page.home")} data={[]} />

      {/* <Row className="match-height">
        <CardIntroduction />
      </Row> */}

      <Row className="match-height">
        <CardCongratulations />
      </Row>

      <Row className="match-height mb-2 mt-2">
          <Row className="mb-1">
            <h3>{t("common.updateFeatures")}</h3>
          </Row>
          <Row style={{paddingRight: 0}}>
            <Col lg="3" md="6">
              <Card className={style.cardContainerFirst}>
                <CardBody
                  className="d-flex flex-column justify-content-between"
                >
                  <div className={`${style.cardFirstWrapper} mb-1`}>
                    <div className={`${style.cardFirst}`}></div>
                  </div>
                  <CardTitle className="fw-bolder fs-5">
                    {t("updateFeatures_homePage.title1")}
                  </CardTitle>
                  <CardSubtitle>
                    {t("updateFeatures_homePage.content1")}
                  </CardSubtitle>
                </CardBody>
              </Card>
            </Col>
            <Col lg="3" md="6">
              <Card className={style.cardContainerSecond}>
                <CardBody
                  className="d-flex flex-column justify-content-between"
                >
                  <div className={`${style.cardSecondWrapper} mb-1`}>
                    <div className={`${style.cardSecond}`}></div>
                  </div>
                  <CardTitle className="fw-bolder fs-5">
                    {t("updateFeatures_homePage.title2")}
                  </CardTitle>
                  <CardSubtitle>
                    {t("updateFeatures_homePage.content2")}
                  </CardSubtitle>
                </CardBody>
              </Card>
            </Col>
            <Col lg="3" md="6">
              <Card className={style.cardContainerThird}>
                <CardBody
                  className="d-flex flex-column justify-content-between"
                >
                  <div className={`${style.cardThirdWrapper} mb-1`}>
                    <div className={`${style.cardThird}`}></div>
                  </div>
                  <CardTitle className="fw-bolder fs-5">
                    {t("updateFeatures_homePage.title3")}
                  </CardTitle>
                  <CardSubtitle>
                    {t("updateFeatures_homePage.content3")}
                  </CardSubtitle>
                </CardBody>
              </Card>
            </Col>
          </Row>
      </Row>

      <Row className="match-height">
        <Row className="mb-1">
          <h3>{t("common.recent")}</h3>
        </Row>
        <Row style={{ paddingRight: 0 }}> 
          <CardTerm />
          <CardTerm />
          <CardTerm />
          <CardTerm />
          <CardTerm />
          <CardTerm />
          <CardTerm />
          <CardTerm />
        </Row>

        <Card>
          <CardBody>
            <div className="d-flex justify-content-evenly align-items-center">
              <div style={{ marginRight: '20px' }}>
                <img
                  src="https://quizlet.com/static/achievements/streak-Week.svg"
                  alt="Streak Icon"
                />
              </div>
              <div>
                <h5 style={{ margin: 0, marginBottom: '0.2rem', fontSize: '1rem', fontWeight: 'bold' }}>
                  {t("updateFeatures_homePage.weekStreak")}
                </h5>
                <p style={{ margin: 0, fontSize: '0.9rem', color: '#7a7a7a' }}>
                  {t("updateFeatures_homePage.weekStreak_content")}
                </p>
              </div>
              <div>
                <div className="d-flex gap-3 pb-1 hover:cursor-pointer" style={{ fontSize: '0.9rem' }}>
                  <div>S</div>
                  <div>M</div>
                  <div>T</div>
                  <div>W</div>
                  <div>T</div>
                  <div>F</div>
                  <div>S</div>
                </div>
                <div className={`d-flex gap-3 hover:cursor-pointer ${style.weekStreak}`} style={{ fontSize: '0.8rem', fontWeight: 'bold' , paddingLeft:"0.5rem"}}>
                  <div>1</div>
                  <div className={style.imageWeekStreak}>2</div>
                  <div className={style.imageWeekStreak}>3</div>
                  <div>4</div>
                  <div className={style.imageWeekStreak}>5</div>
                  <div>6</div>
                  <div className={style.imageWeekStreak}>7</div>
                </div>
              </div>
            </div>
          </CardBody>
        </Card>

        <Row className="mb-1 mt-4">
          <h3>We have</h3>
        </Row>
        <Row>
          <Col xl='2' md='4' sm='6'>
            <StatsVertical icon={<Eye size={21} />} color='info' stats='36.9k' statTitle='Views' className={style.iconWeHave}/>
          </Col>
          <Col xl='2' md='4' sm='6'> 
            <StatsVertical icon={<MessageSquare size={21} />} color='warning' stats='12k' statTitle='Comments' className={style.iconWeHave}/>
          </Col>
          <Col xl='2' md='4' sm='6'>
            <StatsVertical icon={<Heart size={21} />} color='primary' stats='26.8' statTitle='Bookmarks' className={style.iconWeHave}/>
          </Col>
          <Col xl='2' md='4' sm='6'>
            <StatsVertical icon={<Award size={21} />} color='success' stats='689' statTitle='Reviews' className={style.iconWeHave}/>
          </Col>
          <Col xl='2' md='4' sm='6'>
            <StatsVertical icon={<Book size={21} />} color='danger' stats='50+' statTitle='Class Room' className={style.iconWeHave}/>
          </Col>
          <Col xl='2' md='4' sm='6'>
            <StatsVertical icon={<UserCheck size={21} />} color='secondary' stats='97.8k' statTitle='User' className={style.iconWeHave}/>
          </Col>
        </Row>

        <Row className="mt-2">
          <ReactPaginate
            nextLabel=""
            pageCount={10}
            breakLabel="..."
            previousLabel=""
            pageRangeDisplayed={5}
            marginPagesDisplayed={2}
            activeClassName="active"
            pageClassName="page-item"
            breakClassName="page-item"
            nextLinkClassName="page-link"
            pageLinkClassName="page-link"
            nextClassName="page-item next"
            breakLinkClassName="page-link"
            previousLinkClassName="page-link"
            previousClassName="page-item prev"
            containerClassName="pagination react-paginate justify-content-end"
          />
        </Row>
      </Row> 

      <Row className="match-height mt-5">
        <CardFooter/>
      </Row>

    </div>
  );
};

export default Home;
