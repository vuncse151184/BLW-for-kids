import React from "react";
import "./index.css"
import "./bootstrap.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import avatar from './images/avatar.jpg'
import { faTwitter, faFacebook, faFacebookMessenger } from '@fortawesome/free-brands-svg-icons'
import { faRightLong } from '@fortawesome/free-solid-svg-icons'
import experienceIcon from './images/services/consulting.png'
import exerienceIcon1 from './images/services/app-development.svg'
import experienceIcon2 from './images/services/web-design.svg'
import experienceIcon3 from './images/services/full-stack.svg'
const Expert = () => {
    return (
        <>
            <div id="expert">
                <header>
                    <div className="cover bg-light">
                        <div className="container px-3">
                            <div className="row">
                                <div className="col-lg-6 p-2"><img className="img-fluid" src={avatar} alt="hello" /></div>
                                <div className="col-lg-6">
                                    <div className="mt-5">
                                        {/* <p className="lead-expert text-uppercase-expert-expert mb-1"></p> */}
                                        <h1 className="intro-title marker-expert" data-aos="fade-left" data-aos-delay="50">Xin chào!  Tôi là Nguyễn Công Vũ</h1>
                                        <p className="lead-expert fw-normal mt-3" data-aos="fade-up" data-aos-delay="100">Chuyên gia dinh dưỡng là người tư vấn cho mọi người về các vấn đề liên quan đến dinh dưỡng hàng ngày, giải thích cho mọi người hiểu rõ tác động của các loại thực phẩm đối với sức khỏe của con người.</p>
                                        <div className="social-nav" data-aos="fade-up" data-aos-delay="200">
                                            <nav role="navigation">
                                                <ul className="nav justify-content-left">
                                                    <li className="nav-item"><a className="nav-link" href="https://twitter.com/templateflip" title="Twitter"><FontAwesomeIcon icon={faTwitter} /><span className="menu-title sr-only">Twitter</span></a></li>
                                                    <li className="nav-item"><a className="nav-link" href="https://www.facebook.com/templateflip" title="Facebook"><FontAwesomeIcon icon={faFacebook} /><span className="menu-title sr-only">Facebook</span></a></li>
                                                    <li className="nav-item"><a className="nav-link" href="https://www.instagram.com/templateflip" title="Instagram"><FontAwesomeIcon icon={faFacebookMessenger} /><span className="menu-title sr-only">Instagram</span></a></li>
                                                    <li className="nav-item"><a className="nav-link" href="https://www.linkedin.com/" title="LinkedIn"><i className="fab fa-linkedin"></i><span className="menu-title sr-only">LinkedIn</span></a></li>
                                                    <li className="nav-item"><a className="nav-link" href="https://www.behance.net/templateflip" title="Behance"><i className="fab fa-behance"></i><span className="menu-title sr-only">Behance</span></a></li>
                                                </ul>
                                            </nav>
                                        </div>
                                        <div className="container-narrow">
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <div className="row mt-3">
                                                        <div className="col-sm-2">
                                                            <div className="pb-1">Tuổi:</div>
                                                        </div>
                                                        <div className="col-sm-10">
                                                            <div className="pb-1 fw-bolder">28</div>
                                                        </div>
                                                        <div className="col-sm-2">
                                                            <div className="pb-1">Email:</div>
                                                        </div>
                                                        <div className="col-sm-10">
                                                            <div className="pb-1 fw-bolder">walter@company.com</div>
                                                        </div>
                                                    </div>
                                                    <div className="col-sm-2">
                                                        <div className="pb-1">Skype:</div>
                                                    </div>
                                                    <div className="col-sm-10">
                                                        <div className="pb-1 fw-bolder">username@skype.com</div>
                                                    </div>
                                                </div>
                                                <div className="col-md-6">

                                                    <div className="col-sm-2">
                                                        <div className="pb-1">Phone:</div>
                                                    </div>
                                                    <div className="col-sm-10">
                                                        <div className="pb-1 fw-bolder">+0123-456-7890</div>
                                                    </div>
                                                    <div className="col-sm-2">
                                                        <div className="pb-1">Địa chỉ:</div>
                                                    </div>
                                                    <div className="col-sm-10">
                                                        <div className="pb-1 fw-bolder">New Delhi, India</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="mt-3" data-aos="fade-up" data-aos-delay="200"><a className="btn btn-primary shadow-sm mt-1 hover-effect" href="#contact">Get In Touch <FontAwesomeIcon icon={faRightLong} /></a></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="wave-bg"></div>
                </header>


                {/* <div className="section px-2 px-lg-4 pt-5" id="portfolio">
                    <div className="container">
                        <div className="text-center mb-5">
                            <h2 className="marker-expert marker-expert-center">Portfolio </h2>
                        </div>
                        <div className="grid bp-gallery pb-3" data-aos="zoom-in-up" data-aos-delay="100">
                            <div className="grid-sizer"></div>
                            <div className="grid-item"><a href="https://dribbble.com">
                                <figure className="portfolio-item"><img src="./images/portfolio/1-small.png" data-bp="images/portfolio/1.jpg" />
                                    <figcaption>
                                        <h4 className="h5 mb-0">Web Design</h4>
                                        <div>Dribbble.com</div>
                                    </figcaption>
                                </figure></a></div>
                            <div className="grid-item"><a href="https://github.com">
                                <figure className="portfolio-item"><img src="./images/portfolio/2-small.png" data-bp="images/portfolio/2.jpg" data-caption="Example of an optional caption." />
                                    <figcaption>
                                        <h4 className="h5 mb-0">Web Development</h4>
                                        <div>GitHub.com</div>
                                    </figcaption>
                                </figure></a></div>
                            <div className="grid-item"><a href="https://soundcloud.com/">
                                <figure className="portfolio-item"><img src="./images/portfolio/3-small.png" data-bp="images/portfolio/3.jpg" data-caption="Example of an optional caption." />
                                    <figcaption>
                                        <h4 className="h5 mb-0">Audio Mixing</h4>
                                        <div>Soundcloud.com</div>
                                    </figcaption>
                                </figure></a></div>
                            <div className="grid-item"><a href="https://www.adobe.com/">
                                <figure className="portfolio-item"><img src="./images/portfolio/4-small.png" data-bp="images/portfolio/4.jpg" />
                                    <figcaption>
                                        <h4 className="h5 mb-0">Video Editing</h4>
                                        <div>Adobe After Effects</div>
                                    </figcaption>
                                </figure></a></div>
                            <div className="grid-item"><a href="https://www.adobe.com/">
                                <figure className="portfolio-item"><img src="./images/portfolio/5-small.png" data-bp="images/portfolio/5.jpg" />
                                    <figcaption>
                                        <h4 className="h5 mb-0">Photography</h4>
                                        <div>Adobe Photoshop</div>
                                    </figcaption>
                                </figure></a></div>
                            <div className="grid-item"><a href="https://www.android.com/">
                                <figure className="portfolio-item"><img src="./images/portfolio/6-small.png" data-bp="images/portfolio/6.jpg" />
                                    <figcaption>
                                        <h4 className="h5 mb-0">App Development</h4>
                                        <div>Android</div>
                                    </figcaption>
                                </figure></a></div>
                            <div className="grid-item"><a href="https://flutter.dev/">
                                <figure className="portfolio-item"><img src="./images/portfolio/7-small.png" data-bp="images/portfolio/7.jpg" />
                                    <figcaption>
                                        <h4 className="h5 mb-0">App Design</h4>
                                        <div>Flutter</div>
                                    </figcaption>
                                </figure></a></div>
                            <div className="grid-item"><a href="https://flutter.dev/">
                                <figure className="portfolio-item"><img src="./images/portfolio/8-small.png" data-bp="images/portfolio/8.jpg" />
                                    <figcaption>
                                        <h4 className="h5 mb-0">App Development</h4>
                                        <div>Flutter</div>
                                    </figcaption>
                                </figure></a></div>
                        </div>
                    </div>
                </div> */}
                <div className="section px-3 px-lg-4 pt-5" id="experience">
                    <div className="container-narrow">
                        <div className="text-center mb-5">
                            <h2 className="marker-expert marker-expert-center">Experience</h2>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <div className="card-expert mb-3" data-aos="fade-right" data-aos-delay="100">
                                    <div className="card-expert-header px-3 py-2">
                                        <div className="d-flex justify-content-between">
                                            <div>
                                                <h3 className="h5 mb-1">Chuyên gia dinh dưỡng</h3>
                                                <div className="text-muted text-small">Designerr Inc. <small>(2012-2014)</small></div>
                                            </div><img src={experienceIcon} width="48" height="48" alt="ui-ux" />
                                        </div>
                                    </div>
                                    <div className="card-expert-body px-3 py-2">
                                        <p>Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collaborative thinking to further the overall value proposition.</p>
                                        <p>Organically grow the holistic world view of disruptive innovation via workplace diversity and empowerment.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="card-expert mb-3" data-aos="fade-left" data-aos-delay="300">
                                    <div className="card-expert-header px-3 py-2">
                                        <div className="d-flex justify-content-between">
                                            <div>
                                                <h3 className="h5 mb-1">Chuyên khoa sức khoẻ</h3>
                                                <div className="text-muted text-small">MakeMyApp LLC. <small>(2015-2018)</small></div>
                                            </div><img src={exerienceIcon1} width="48" height="48" alt="app development" />
                                        </div>
                                    </div>
                                    <div className="card-expert-body px-3 py-2">
                                        <p>Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collaborative thinking to further the overall value proposition.</p>
                                        <p>Organically grow the holistic world view of disruptive innovation via workplace diversity and empowerment.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="card-expert mb-3" data-aos="fade-right" data-aos-delay="200">
                                    <div className="card-expert-header px-3 py-2">
                                        <div className="d-flex justify-content-between">
                                            <div>
                                                <h3 className="h5 mb-1">Chuyên gia</h3>
                                                <div className="text-muted text-small">Webbie LLC. <small>(2018-2020)</small></div>
                                            </div><img src={experienceIcon2} width="48" height="48" alt="web design" />
                                        </div>
                                    </div>
                                    <div className="card-expert-body px-3 py-2">
                                        <p>Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collaborative thinking to further the overall value proposition.</p>
                                        <p>Organically grow the holistic world view of disruptive innovation via workplace diversity and empowerment.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="card-expert mb-3" data-aos="fade-left" data-aos-delay="400">
                                    <div className="card-expert-header px-3 py-2">
                                        <div className="d-flex justify-content-between">
                                            <div>
                                                <h3 className="h5 mb-1">Chuyên gia</h3>
                                                <div className="text-muted text-small">Coder Inc. <small>(2020-2021)</small></div>
                                            </div><img src={experienceIcon3} width="48" height="48" alt="full stack" />
                                        </div>
                                    </div>
                                    <div className="card-expert-body px-3 py-2">
                                        <p>Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collaborative thinking to further the overall value proposition.</p>
                                        <p>Organically grow the holistic world view of disruptive innovation via workplace diversity and empowerment.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <div className="section px-3 px-lg-4 pt-5" id="testimonials">
                <div className="container-narrow">
                    <div className="text-center mb-5">
                        <h2 className="marker-expert marker-expert-center">Client Testimonials</h2>
                    </div>
                    <div className="row">
                        <div className="col-md-6 mb-5" data-aos="fade-right" data-aos-delay="100">
                            <div className="d-flex ms-md-3"><span><i className="fas fa-2x fa-quote-left"></i></span><span className="m-2">Walter displays exemplary professionalism and is able to take on challenges. He learns quickly and is an asset to any team.</span></div>
                            <div className="d-flex justify-content-end align-items-end">
                                <div className="text-end me-2">
                                    <div className="fw-bolder">Aiyana</div>
                                    <div className="text-small">CEO / Web Design Company</div>
                                </div><img className="me-md-3 rounded" src="./images/testimonials/client1.jpg" width="96" height="96" alt="client 1" />
                            </div>
                        </div>
                        <div className="col-md-6 mb-5" data-aos="fade-left" data-aos-delay="300">
                            <div className="d-flex ms-md-3"><span><i className="fas fa-2x fa-quote-left"></i></span><span className="m-2">Walter displays exemplary professionalism and is able to take on challenges. He learns quickly and is an asset to any team.</span></div>
                            <div className="d-flex justify-content-end align-items-end">
                                <div className="text-end me-2">
                                    <div className="fw-bolder">Alexander</div>
                                    <div className="text-small">CEO / Web Design Company</div>
                                </div><img className="me-md-3 rounded" src="./images/testimonials/client2.jpg" width="96" height="96" alt="client 1" />
                            </div>
                        </div>
                        <div className="col-md-6 mb-5" data-aos="fade-right" data-aos-delay="200">
                            <div className="d-flex ms-md-3"><span><i className="fas fa-2x fa-quote-left"></i></span><span className="m-2">Walter is a great co-worker and problem solver. He is quick to extend his helping hand and makes a good team player.</span></div>
                            <div className="d-flex justify-content-end align-items-end">
                                <div className="text-end me-2">
                                    <div className="fw-bolder">Ariya</div>
                                    <div className="text-small">Web Developer</div>
                                </div><img className="me-md-3 rounded" src="./images/testimonials/client3.jpg" width="96" height="96" alt="client 1" />
                            </div>
                        </div>
                        <div className="col-md-6 mb-5" data-aos="fade-left" data-aos-delay="400">
                            <div className="d-flex ms-md-3"><span><i className="fas fa-2x fa-quote-left"></i></span><span className="m-2">Walter is a great co-worker and problem solver. He is quick to extend his helping hand and makes a good team player.</span></div>
                            <div className="d-flex justify-content-end align-items-end">
                                <div className="text-end me-2">
                                    <div className="fw-bolder">Braiden</div>
                                    <div className="text-small">Web Designer</div>
                                </div><img className="me-md-3 rounded" src="./images/testimonials/client4.jpg" width="96" height="96" alt="client 1" />
                            </div>
                        </div>
                    </div>
                </div>
            </div> */}
                <div class="section px-2 px-lg-4 pb-4 pt-5 mb-5" id="contact">
                    <div class="container-narrow">
                        <div class="text-center mb-5">
                            <h2 class="marker-expert marker-expert-center">Contact Me</h2>
                        </div>
                        {/* <div class="row">
                        <div class="col-md-6" data-aos="zoom-in" data-aos-delay="100">
                            <div class="bg-light my-2 p-3 pt-2"><form action="https://formspree.io/your@email.com"
                                method="POST">
                                <div class="form-group my-2">
                                    <label for="name" class="form-label fw-bolder">Name</label>
                                    <input class="form-control" type="text" id="name" name="name" required>
                                </div>
                                <div class="form-group my-2">
                                    <label for="email" class="form-label fw-bolder">Email</label>
                                    <input class="form-control" type="email" id="email" name="_replyto" required>
                                </div>
                                <div class="form-group my-2">
                                    <label for="message" class="form-label fw-bolder">Message</label>
                                    <textarea class="form-control" style="resize: none;" id="message" name="message" rows="4" required></textarea>
                                </div>
                                <button class="btn btn-primary mt-2" type="submit">Send</button>
                            </form>
                            </div>
                        </div>
                        <div class="col-md-6" data-aos="fade-left" data-aos-delay="300">
                            <div class="mt-3 px-1">
                                <div class="h5">Let’s talk how I can help you!</div>
                                <p>If you like my work and want to avail my services then drop me a message using the contact form. </p>
                                <p>Or get in touch using my email, skype or my contact number.</p>
                                <p>See you!</p>
                            </div>
                            <div class="mt-53 px-1">
                                <div class="row">
                                    <div class="col-sm-2">
                                        <div class="pb-1">Email:</div>
                                    </div>
                                    <div class="col-sm-10">
                                        <div class="pb-1 fw-bolder">walter@company.com</div>
                                    </div>
                                    <div class="col-sm-2">
                                        <div class="pb-1">Skype:</div>
                                    </div>
                                    <div class="col-sm-10">
                                        <div class="pb-1 fw-bolder">username@skype.com</div>
                                    </div>
                                    <div class="col-sm-2">
                                        <div class="pb-1">Phone:</div>
                                    </div>
                                    <div class="col-sm-10">
                                        <div class="pb-1 fw-bolder">+0718-111-0011</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div> */}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Expert