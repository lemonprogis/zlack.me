import React from 'react';
import { v1 as uuid } from "uuid";
import PageWrapper from '../components/PageWrapper';

const CreateRoom = (props) => {
    const id = '/room/' + uuid();
    return (
        <PageWrapper>
            <section class="bg-light py-5">
                <div class="container px-5">
                    <div class="row gx-5 justify-content-center">
                        <div class="col-xxl-8">
                            <div class="text-center my-5">
                                <h2 class="display-5 fw-bolder"><span class="text-gradient d-inline">Get Zlackin</span></h2>
                                <p class="text-muted">Be a zlacker, just create a room and share it with folks you want to talk to. Nothing is saved, once you leave it's gone. About as real time as really being with each other.</p>
                                <div class="d-flex justify-content-center fs-2 gap-4">
                                    <a class="btn btn-primary btn-lg px-5 py-3 me-sm-3 fs-6 fw-bolder" href={id}>Create room</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </PageWrapper>
    );
};

export default CreateRoom;