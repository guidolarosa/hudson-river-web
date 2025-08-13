import Image from "next/image";
import { sanitizeString, validateEmail } from '@/utils/utils';
import { useState, useEffect } from "react";
import { herokuUrl } from '@/utils/constants';
import { Inter } from "@next/font/google";
import styled from "styled-components";

const inter = Inter({subsets: ['latin'], weight: ['300', '400', '500', '600', '700']});

const StyledContactForm = styled.form`
  &.submited {
    .input-group {
      opacity: 0.5;
    }
    .submit {
      opacity: 1;
      button {
        color: ${props => props.theme.colors.gold25};
        border-color: ${props => props.theme.colors.gold500};
        background: ${props => props.theme.colors.gold500};
      }
    }
  }
  .input-row {
    display: flex;
    gap: 3rem;
    flex-direction: column;
    .input-group {
      &:first-of-type {
        margin-bottom: 0.5rem;
      }
    }
    @media ${props => props.theme.bp.lg} {
      flex-direction: row;
      .input-group {
        flex-grow: 1;
      }
    }
  }
  .input-group {
    display: flex;
    flex-direction: column;
    margin-bottom: 4rem;
    position: relative;
    .error-icon,
    .alert {
      opacity: 0;
      pointer-events: none;
      position: absolute;
      transition: 0.25s ease-in-out;
    }
    .error-icon {
      width: 2rem;
      height: 2rem;
      top: 3.5rem;
      right: 0rem;
    }
    .alert {
      bottom: -2.5rem;
      font-size: 1.625rem;
      letter-spacing: 0.03em;
      color: ${props => props.theme.colors.error};
      @media ${props => props.theme.bp.lg} {
        bottom: 1rem;
      }
    }
    &.invalid {
      .error-icon,
      .alert {
        opacity: 1;
      }
      input {
        border-color: ${props => props.theme.colors.error};
      }
    }
    &.message {
      margin-bottom: 5rem;
      label {
        margin-bottom: 2rem;
      }
    }
    label {
      text-transform: uppercase;
      margin-bottom: 0.5rem;
      font-size: 1.25rem;
      span {
        color: ${props => props.theme.colors.gold500};
      }
    }
    input, textarea {
      background: transparent;
      border: 0;
      outline: none;
      border-bottom: 1px solid ${props => props.theme.colors.gold100};
      font-family: unset;
      padding: 1rem;
      font-size: 2rem;
      color: ${props => props.theme.colors.gold900};
      &::placeholder {
        color: ${props => props.theme.colors.gold100};
        font-size: 2rem;
      }
    }
    input {
      height: 4.75rem;
    }
    textarea {
      border: 1px solid ${props => props.theme.colors.gold100};
      border-radius: 0.5rem;
      resize: none;
      height: 20rem;
    }
    button {
      height: 5rem;
      background: transparent;
      border: 1px solid ${props => props.theme.colors.gold50};
      color: ${props => props.theme.colors.gold50};
      border-radius: 10rem;
      font-size: 2rem;
      pointer-events: none;
      transition: 0.25s ease-in-out all;
      @media ${props => props.theme.bp.md} {
        width: 27.75rem;
      }
      &.enabled {
        border-color: ${props => props.theme.colors.gold100};
        color: ${props => props.theme.colors.gold900};
        pointer-events: auto;
        cursor: pointer;
      }
      &:hover {
        border-color: ${props => props.theme.colors.gold500};
        color: ${props => props.theme.colors.gold500};
      }
    }
  }
`

export default ContactForm;
