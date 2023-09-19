import React from 'react';
import ZlackLogo from '../components/ZlackLogo';
import PageWrapper from '../components/PageWrapper';

function Home() {
    return (
        <PageWrapper>
            <header class="py-5">
            <div class="container px-5 pb-5">
                <div class="row gx-5 align-items-center">
                    <div class="col-xxl-5">
                        <div class="text-center text-xxl-start">
                            <div class="badge bg-gradient-primary-to-secondary text-white mb-4"><div class="text-uppercase">Peer &middot; &middot; Peer</div></div>
                            <div class="fs-3 fw-light text-muted">It's easy to get started</div>
                            <h1 class="display-3 fw-bolder mb-5"><span class="text-gradient d-inline">Get Zlacking</span></h1>
                            <div class="d-grid gap-3 d-sm-flex justify-content-sm-center justify-content-xxl-start mb-3">
                                <a class="btn btn-primary btn-lg px-5 py-3 me-sm-3 fs-6 fw-bolder" href="/create-room">Get Started</a>
                            </div>
                        </div>
                    </div>
                    <div class="col-xxl-7">
                        <ZlackLogo />
                    </div>
                </div>
            </div>
        </header>
        <section class="bg-light py-5">
            <div class="container px-5">
                <div class="row gx-5 justify-content-center">
                    <div class="col-xxl-8">
                        <div class="text-center my-5">
                            <h2 class="display-5 fw-bolder"><span class="text-gradient d-inline">About Zlack</span></h2>
                            <p class="lead fw-light mb-4">I just wanted a way to create a room without signing up to communicate.</p>
                            <p class="text-muted">Be a zlacker, just create a room and share it with folks you want to talk to. Nothing is saved, once you leave it's gone. About as real time as really being with each other.</p>
                            <div class="d-flex justify-content-center fs-2 gap-4">
                                <a class="text-gradient" href="#!"><i class="bi bi-twitter"></i></a>
                                <a class="text-gradient" href="#!"><i class="bi bi-linkedin"></i></a>
                                <a class="text-gradient" href="#!"><i class="bi bi-github"></i></a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </PageWrapper>
    );
}

export default Home;