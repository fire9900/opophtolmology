import "../assets/styles/pages/home.scss"

const HomePage = () => {
    return (
        <>
            <section className="try-section">
                <p className="section-title">OpOphtolmology</p>
                <div className="try-buttons">
                    <a className="primary" href="#pricing-section">Попробовать бесплатно</a>
                    <a href="#pricing-section">Другие предложения</a>
                </div>
            </section>
            <section className="home-section feature-section">
                <h1>Мощный инструмент использующий передовые технологии нейронных сетей.</h1>
                <h3>Меньше рутины, больше продуктивной работы.</h3>
                <a href="#dignities-section" className="learn-more">Узнать больше</a>
            </section>
            <section className="home-section feedback-section">
                <h1>9 из 10 офтамологов рекомендуют наш продукт.</h1>
                <h3>Наши покупатели говорят:</h3>
                <div className="feedback-container">
                    <div className="feedback-card">
                        <div className="feedback-card__user">
                            <img className="feedback-card__user-avatar" src="/images/user-avatars/green.png"></img>
                            <div className="feedback-card__user-cred">
                                <div className="feedback-card__user-name">Миша</div>
                                <div className="feedback-card__user-location">Мурино</div>
                            </div>
                        </div>
                        <p className="feedback-card__text">А говорили ИИ заберёт мою работу, но он сделал её проще!</p>
                    </div>
                    <div className="feedback-card">
                        <div className="feedback-card__user">
                            <img className="feedback-card__user-avatar" src="/images/user-avatars/red.png"></img>
                            <div className="feedback-card__user-cred">
                                <div className="feedback-card__user-name">Никита</div>
                                <div className="feedback-card__user-location">Москва</div>
                            </div>
                        </div>
                        <p className="feedback-card__text">Всё стало быстрее и проще, так что у меня прибавилось времени на обед</p>
                    </div>
                </div>
            </section>
            <section className="dignities-section" id="dignities-section">
                <div className="dignities-card">
                    <div className="dignities-card__content">
                        <p className="dignities-card__title">Приложение способное работать на любом устройстве.</p>
                        <p className="dignities-card__description">Наше приложение требует всего лишь камеру телефона
                            для полной работы.</p>
                    </div>
                    <img className="dignities-card__img" src="/images/dignities/1.png"></img>
                </div>
                <div className="dignities-card">
                    <div className="dignities-card__content">
                        <p className="dignities-card__title">Интерактивное обучение.</p>
                        <p className="dignities-card__description">Приложение адаптирует обучение под пользователя.</p>
                    </div>
                    <img className="dignities-card__img" src="/images/dignities/2.png"></img>
                </div>
                <div className="dignities-card">
                    <div className="dignities-card__content">
                        <p className="dignities-card__title">Передовая информация.</p>
                        <p className="dignities-card__description">Приложение постоянно развивается и использует передовые медицинские знания.</p>
                    </div>
                    <img className="dignities-card__img" src="/images/dignities/3.png"></img>
                </div>
            </section>
            <section className="pricing-section" id="pricing-section">
                <div className="pricing-card">
                    <div className="pricing-card__desc">
                        <p className="pricing-card__name">Эконом</p>
                        <p className="pricing-card__for">Для физических лиц</p>
                    </div>
                    <div className="pricing-card__price">
                        <h1>10 000₽</h1>
                        <p>/месяц</p>
                    </div>
                    <div className="pricing-card__features-list">
                        <p className="pricing-card__feature">Особенность 1</p>
                        <p className="pricing-card__feature">Особенность 2</p>
                        <p className="pricing-card__feature">Особенность 3</p>
                    </div>
                    <button className="pricing-card__btn" type="button">Получить</button>
                </div>
                <div className="pricing-card">
                    <div className="pricing-card__desc">
                        <p className="pricing-card__name">Стандарт</p>
                        <p className="pricing-card__for">Для средних организаций</p>
                    </div>
                    <div className="pricing-card__price">
                        <h1>75 000₽</h1>
                        <p>/месяц</p>
                    </div>
                    <div className="pricing-card__features-list">
                        <p className="pricing-card__feature">Преимущества плана "Эконом"</p>
                        <p className="pricing-card__feature">Особенность 2</p>
                        <p className="pricing-card__feature">Особенность 3</p>
                    </div>
                    <button className="pricing-card__btn" type="button">Получить</button>
                </div>
                <div className="pricing-card">
                    <div className="pricing-card__desc">
                        <p className="pricing-card__name">Профессионал</p>
                        <p className="pricing-card__for">Для крупных организаций</p>
                    </div>
                    <div className="pricing-card__price">
                        <h1>130 000₽</h1>
                        <p>/месяц</p>
                    </div>
                    <div className="pricing-card__features-list">
                        <p className="pricing-card__feature">Преимущества плана "Стандарт"</p>
                        <p className="pricing-card__feature">Особенность 2</p>
                        <p className="pricing-card__feature">Особенность 3</p>
                    </div>
                    <button className="pricing-card__btn" type="button">Получить</button>
                </div>
            </section>
        </>
    )
}

export default HomePage
