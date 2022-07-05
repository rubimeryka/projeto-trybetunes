import React from 'react';
import { Link } from 'react-router-dom';
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
         <Link data-testid="link-to-search" to="/search">Pesquisar</Link>
         <Link data-testid="link-to-favorites" to="/favorites">Músicas Favoritas</Link>
         <Link data-testid="link-to-profile" to="/profile">Perfil</Link>
       </header>
     );
   }
}

export default Header;
