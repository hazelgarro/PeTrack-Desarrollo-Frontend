import PropTypes from "prop-types";
import NavBar from "../../organisms/NavMenu";
import NavLoged from "../../organisms/NavLoged";
import Footer from "../../organisms/Footer";

const PageLayout = ({ children, navVariant = "" }) => {
    return (
        <div className="min-h-screen flex flex-col">
            {/* NavBar en la parte superior */}
            <NavBar variant={navVariant} />

            {/* Contenido de la página */}
            <main className="flex-grow">
                {children}
            </main>

            {/* Footer en la parte inferior */}
            <Footer />
        </div>
    );
};

PageLayout.propTypes = {
    children: PropTypes.node.isRequired,
    navVariant: PropTypes.string,
};

export default PageLayout;
