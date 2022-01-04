import React from "react";

import styles from "./EvidenceConfirmationRegistry.module.css";
import LinkButton from "../LinkButton/LinkButton";

const EvidenceConfirmationRegistry = (props) => {
    return ( 
        <div className={styles.registryWrapper}>
            <p className={styles.info}>Dodane załączniki: {props.attachment}</p>
            <p className={styles.info}>Przypisani weryfikujący: {props.verifying}</p>
            <LinkButton path='/'>Zgłoś</LinkButton>
        </div>
     );
}
 
export default EvidenceConfirmationRegistry;