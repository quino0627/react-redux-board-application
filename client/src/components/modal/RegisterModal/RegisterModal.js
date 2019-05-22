import React from "react";
import styles from "./RegisterModal.scss";
import classNames from "classnames/bind";
import ModalWrapper from "../../../components/modal/ModalWrapper";

const cx = classNames.bind(styles);

const RegisterModal = ({
  visible,
  username,
  password,
  error,
  onCancel,
  onRegister,
  onUsernameChange,
  onPasswordChange,
  onKeyPress
}) => (
  <ModalWrapper visible={visible}>
    <div className={cx("form")}>
      <div onClick={onCancel} className={cx("close")}>
        &times;
      </div>
      <div className={cx("title")}>회원가입</div>
      <div className={cx("description")}>작성하세요!</div>
      <input
        autoFocus
        type="username"
        placeholder="username 입력"
        value={username}
        onChange={onUsernameChange}
        onKeyPress={onKeyPress}
      />
      <input
        type="password"
        placeholder="비밀번호 입력"
        value={password}
        onChange={onPasswordChange}
        onKeyPress={onKeyPress}
      />
      {error && <div className={cx("error")}>회원가입 실패</div>}
      <div className={cx("login")} onClick={onRegister}>
        회원가입
      </div>
    </div>
  </ModalWrapper>
);

export default RegisterModal;
