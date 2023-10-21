import Header from "@/components/common/Header";
import AbsButton from "./_abs-button";

import $ from "./page.module.scss";
import LoadingIndicator from "@/components/ui/LoadingIndicator";

export default function Page() {
  return (
    <div className={$.root}>
      <Header className={$.header} />
      <div className={$.bodySection}>
        <div
          style={{
            textAlign: "center",
            paddingTop: 64,
          }}
        >
          <LoadingIndicator />
        </div>
        <div className={$.absButtonContainer}>
          <AbsButton className={$.absButton} />
        </div>
      </div>
    </div>
  );
}
