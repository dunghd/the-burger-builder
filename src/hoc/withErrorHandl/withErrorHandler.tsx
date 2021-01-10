import { AxiosInstance } from 'axios';
import React, { Component, ComponentClass } from 'react';
import Modal from '../../components/UI/Modal/Modal';
import Auxiliary from '../Auxiliary/Auxiliary';

type WithErrorHandlerState = {
  error?: Error | undefined
};

const withErrorHandler = <P, S>(WrappedComponent: ComponentClass<P, S & WithErrorHandlerState>, axios: AxiosInstance) => {
  return class extends Component<P, S & WithErrorHandlerState> {
    state = {
      error: undefined
    } as S & WithErrorHandlerState;

    reqInterceptor: number | undefined;
    resInterceptor: number | undefined;

    componentWillMount() {
      this.reqInterceptor = axios.interceptors.request.use(req => {
        this.setState({ error: undefined });
        return req;
      });

      this.resInterceptor = axios.interceptors.response.use(res => res, error => {
        this.setState({ error: error });
      });
    }

    componentWillUnmount() {
      if (typeof (this.reqInterceptor) === 'number')
        axios.interceptors.request.eject(this.reqInterceptor);
      if (typeof (this.resInterceptor) === 'number')
        axios.interceptors.response.eject(this.resInterceptor);
    }

    errorConfirmHandler = () => {
      this.setState({ error: undefined });
    };

    render() {
      return (
        <Auxiliary>
          <Modal
            show={this.state.error !== undefined}
            modalClosed={this.errorConfirmHandler}>
            {this.state.error ? this.state.error.message : undefined}
          </Modal>
          <WrappedComponent {...this.props} />
        </Auxiliary>
      )
    };
  };
};

export default withErrorHandler;