import React,{ useState} from "react";
import {Alert} from "react-bootstrap";
import "./style.css"

export default function AlertDismissible(props) {

    const [show, setShow] = useState(true);
    if (show===true) {
        return (
            <div id="alert">
                <Alert style={{display:"inline-block", margin:"auto"  ,padding:"5px"}} variant="secondary" onClose={() => setShow(false)} dismissible>
                    <Alert.Heading>Note!</Alert.Heading>
                    <p>
                        Due to timely API updates the graphical representation might not be accurate. <br/>Refresh page if error loading charts.
                    </p>
                </Alert>
            </div>
        );
    }

    else{

        return (
            <div>

            </div>

        )
    }


}
