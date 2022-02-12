import { useEffect } from "react";
import { batch, useDispatch, useSelector } from "react-redux";
import Font from "./components/Font";
import {
  getTabsData,
  getBuyFontsData,
  getMyFontsData,
  selectTab,
} from "./redux/apiSlice";
import { BUY_FONTS, MY_FONTS } from "./constants";
import "./assets/style/index.scss";

const App = () => {
  const tabs = useSelector((state) => state.api.tabs);
  const myFonts = useSelector((state) => state.api.myFonts);
  const buyFonts = useSelector((state) => state.api.buyFonts);
  const tabSelected = useSelector((state) => state.api.tabSelected);

  const dispatch = useDispatch();

  useEffect(() => {
    batch(() => {
      if (tabs.length === 0) {
        dispatch(getTabsData());
      }
      if (myFonts.length === 0) {
        dispatch(getBuyFontsData());
      }
      if (Object.keys(buyFonts).length === 0) {
        dispatch(getMyFontsData());
      }
    });
  }, []);

  const handleSectionChange = (newTab) => {
    if (tabSelected === newTab) {
      return;
    }
    dispatch(selectTab(newTab));
  };

  return (
    <div className="body--block">
      <div className="centered">
        <section className="tabs-switcher">
          <h1>Please select one font</h1>
          <section>
            {tabs &&
              tabs.map((tab) => (
                <button
                  key={tab.id}
                  style={{
                    color: tab.label !== tabSelected ? "#ff7352" : null,
                  }}
                  onClick={() => handleSectionChange(tab.label)}
                >
                  {tab.label}
                </button>
              ))}
          </section>
        </section>
        {tabSelected === MY_FONTS && (
          <form className="form">
            <>
              {myFonts.length > 0 && (
                <Font key={myFonts[0].id} font={myFonts[0]} main={true} />
              )}
            </>
            <div className="block--squares-small">
              {myFonts.length > 0 &&
                myFonts.slice(1).map((font) => {
                  return <Font key={font.id} font={font} main={false} />;
                })}
            </div>
          </form>
        )}
        {tabSelected === BUY_FONTS && Object.keys(buyFonts).length > 0 && (
          <div className="form">
            <p className="buy-fonts--text">{buyFonts.content}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
