import Head from "next/head";
import Image from "next/image";
import { Props } from "next/script";
import Link from "next/link";


const Child = ({ ...props }: any) => {
    //console.log( props?.hooks );
    
    return (
        <div className="main">
            <section className="signup">
                <div className="container">
                    <div className="signup-content">
                        <div className="signup-form">
                            <h2 className="form-title">Sign up</h2>
                            <form method="POST" className="register-form" id="register-form">
                                <div className="form-group">
                                    <label htmlFor="name"><i className="zmdi zmdi-account material-icons-name"></i></label>
                                    <input type="text" name="name" id="name" placeholder="Your Name" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="email"><i className="zmdi zmdi-email"></i></label>
                                    <input type="email" name="email" id="email" placeholder="Your Email" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="pass"><i className="zmdi zmdi-lock"></i></label>
                                    <input type="password" name="pass" id="pass" placeholder="Password" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="re-pass"><i className="zmdi zmdi-lock-outline"></i></label>
                                    <input type="password" name="re_pass" id="re_pass" placeholder="Repeat your password" />
                                </div>
                                <div className="form-group">
                                    <input type="checkbox" name="agree-term" id="agree-term" className="agree-term" />
                                    <label htmlFor="agree-term" className="label-agree-term"><span><span></span></span>I agree all statements in <a href="#" className="term-service">Terms of service</a></label>
                                </div>
                                <div className="form-group form-button">
                                    <input type="submit" name="signup" id="signup" className="form-submit" value="Register" />
                                </div>
                            </form>
                        </div>
                        <div className="signup-image">
                            <figure><img src="images/signup-image.jpg" alt="sing up image" /></figure>
                            <Link href="/login" className="signup-image-link">Login</Link>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    )
}

export default function Home(props: Props) {
    //const hooks = LoginHook()
    return (<Child {...props} />);

}
