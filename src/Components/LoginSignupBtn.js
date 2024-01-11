import React from 'react'

export default function LoginSignupBtn(props) {

    return (
        <>
            <div className="row mt-4">
                <div className="col">
                    <button className='signUpWithGA' href='/'>
                        {/* Google icon */}
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-google mb-1" viewBox="0 0 16 16">
                            <path d="M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.689 7.689 0 0 1 5.352 2.082l-2.284 2.284A4.347 4.347 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.792 4.792 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.702 3.702 0 0 0 1.599-2.431H8v-3.08h7.545z" />
                        </svg> Sign up with Google</button><br />
                    <button className='signUpWithGA mt-3' href='/'>
                        {/* Apple icon */}
                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" className="bi bi-apple pb-1" viewBox="0 0 16 16">
                            <path d="M11.182.008C11.148-.03 9.923.023 8.857 1.18c-1.066 1.156-.902 2.482-.878 2.516.024.034 1.52.087 2.475-1.258.955-1.345.762-2.391.728-2.43Zm3.314 11.733c-.048-.096-2.325-1.234-2.113-3.422.212-2.189 1.675-2.789 1.698-2.854.023-.065-.597-.79-1.254-1.157a3.692 3.692 0 0 0-1.563-.434c-.108-.003-.483-.095-1.254.116-.508.139-1.653.589-1.968.607-.316.018-1.256-.522-2.267-.665-.647-.125-1.333.131-1.824.328-.49.196-1.422.754-2.074 2.237-.652 1.482-.311 3.83-.067 4.56.244.729.625 1.924 1.273 2.796.576.984 1.34 1.667 1.659 1.899.319.232 1.219.386 1.843.067.502-.308 1.408-.485 1.766-.472.357.013 1.061.154 1.782.539.571.197 1.111.115 1.652-.105.541-.221 1.324-1.059 2.238-2.758.347-.79.505-1.217.473-1.282Z" />
                            <path d="M11.182.008C11.148-.03 9.923.023 8.857 1.18c-1.066 1.156-.902 2.482-.878 2.516.024.034 1.52.087 2.475-1.258.955-1.345.762-2.391.728-2.43Zm3.314 11.733c-.048-.096-2.325-1.234-2.113-3.422.212-2.189 1.675-2.789 1.698-2.854.023-.065-.597-.79-1.254-1.157a3.692 3.692 0 0 0-1.563-.434c-.108-.003-.483-.095-1.254.116-.508.139-1.653.589-1.968.607-.316.018-1.256-.522-2.267-.665-.647-.125-1.333.131-1.824.328-.49.196-1.422.754-2.074 2.237-.652 1.482-.311 3.83-.067 4.56.244.729.625 1.924 1.273 2.796.576.984 1.34 1.667 1.659 1.899.319.232 1.219.386 1.843.067.502-.308 1.408-.485 1.766-.472.357.013 1.061.154 1.782.539.571.197 1.111.115 1.652-.105.541-.221 1.324-1.059 2.238-2.758.347-.79.505-1.217.473-1.282Z" />
                        </svg> Sign up with Apple</button>
                </div>
            </div>
            <div className="row mt-2">
                <div className="col-5 horizontal-line">
                    <span>or</span>
                </div>
                <div className="col-7"></div>
            </div>
            <div className="row mt-1">
                <div className="col">
                    <button onClick={() => { props.setPressSignupBtn(true); props.setHomeOpacity(0.8); props.setPressLoginBtn(false); }} className='createAccountBtn' href='/'>Create account</button>
                </div>
            </div>
            <div className="row">
                <div className="col-6">
                    <p className='createAccountCotation'>By signing up, you agree to the <a href='/'>Terms of Service</a> and <a href='/'>Privacy Policy</a>, including <a href='/'>Cookie Use</a>.</p>
                </div>
                <div className="col-6"></div>
            </div>

            <div className="row mt-5">
                <div className="col">
                    <label className='h5'>Already have an account?</label><br />
                    <button onClick={() => { props.setPressLoginBtn(true); props.setPressSignupBtn(false); props.setHomeOpacity(0.8); }} className='signInBtn mt-2' href='/'>Sign in</button>
                </div>
            </div>
        </>
    )
}
