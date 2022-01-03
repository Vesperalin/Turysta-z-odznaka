import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import styles from "./EvidenceConfirmationManager.module.css";
import EvidenceConfirmationSegmentsList from "../../View/EvidenceConfirmationSegmentsList/EvidenceConfirmationSegmentsList";

const EvidenceConfirmationManager = props => {

  return (
  <EvidenceConfirmationSegmentsList 
    matchedElements = {props.matchedSegments}
  />
    );
};

export default EvidenceConfirmationManager;
