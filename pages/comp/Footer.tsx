import React from "react";

export default function Footer() {
    return(
    <>
        <footer className="bg-dark text-light py-4 mt-5">
            <div className="container text-center">
                <p className="mb-2">&copy; 2025 Tradery. All Rights Reserved.</p>
                <p className="mb-2">
                    <a href="#termsModal" className="text-light" data-bs-toggle="modal">Terms and Conditions</a>
                </p>
            </div>

            <div className="modal fade" id="termsModal" tabIndex={-1} aria-labelledby="termsModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="termsModalLabel">Terms and Conditions</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body text-start">
                            <h6>1. User Responsibility</h6>
                            <p>By using this platform, you acknowledge that all interactions and transactions between users are conducted at your own risk...</p>
                            <h6>2. Privacy and Message Monitoring</h6>
                            <p>We respect your privacy and do not monitor or view private messages exchanged between users during transactions...</p>
                            <h6>3. Item Posting and Review</h6>
                            <p>All items posted on the platform are subject to review by an administrator...</p>
                            <h6>4. Violations and Account Management</h6>
                            <p>Users who repeatedly violate our guidelines by posting inappropriate content or engaging in prohibited activities...</p>
                            <h6>5. Disclaimer of Liability</h6>
                            <p>We do not guarantee the quality, safety, legality, or authenticity of the items listed on the platform...</p>
                            <h6>6. Amendments and Changes</h6>
                            <p>We reserve the right to update or modify these Terms and Conditions at any time...</p>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    </>
    )
}