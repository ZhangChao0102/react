import React, {useContext} from 'react';
import {MyContext} from '../context/Context';

class TestContext extends React.Component{
    constructor(props) {
        super(props);

        // this.context2 = useContext(MyContext);
    }

    render(){
        return (
            <div>
                <MyContext.Consumer>
                    {
                        (value) =>
                            <div>
                                {value}
                            </div>
                    }
                </MyContext.Consumer>
                {/*{this.context2}*/}
            </div>
        );
    }

}

export default TestContext;
