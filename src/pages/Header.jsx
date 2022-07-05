import React from 'react';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class Header extends React.Component {
  constructor() {
    super();
    this.state = { loading: true, userName: '',
    };
  }

  fetchGetUserName = async () => {
    const user = await getUser();
    this.setState({ loading: false, userName: user.name });
  }

   componentDidMount = () => {
     this.fetchGetUserName();
   }

   render() {
     const { loading, userName } = this.state;

     return (
       <header
         data-testid="header-component"
       >
         { loading
           ? <Loading />
           : (
             <div data-testid="header-user-name">
               { userName }
             </div>
           )}
       </header>
     );
   }
}

export default Header;
