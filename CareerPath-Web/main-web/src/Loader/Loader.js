import React,{Component} from 'react'
import Loader from "react-loader-spinner";
import Colors from '../Colors/Colors';
export default class App extends Component {
  //other logic
  render() {
    return (
      <Loader
        type="TailSpin"
        color={Colors.blue}
        height={200}
        width={200}
        // timeout={5000} //5 secs
      />
    );
  }
}