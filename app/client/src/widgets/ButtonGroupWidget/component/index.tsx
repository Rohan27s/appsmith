import React from "react";
import { sortBy } from "lodash";
import { Alignment, Icon, Menu, MenuItem } from "@blueprintjs/core";
import { Classes, Popover2 } from "@blueprintjs/popover2";
import { IconName } from "@blueprintjs/icons";
import { Theme } from "constants/DefaultTheme";
import tinycolor from "tinycolor2";
import { darkenActive, darkenHover } from "constants/DefaultTheme";
import {
  ButtonBoxShadow,
  ButtonBoxShadowTypes,
  ButtonBorderRadius,
  ButtonBorderRadiusTypes,
  ButtonStyleType,
  ButtonStyleTypes,
  ButtonVariant,
  ButtonVariantTypes,
} from "components/constants";
import { ThemeProp } from "components/ads/common";
import styled, { createGlobalStyle } from "styled-components";
import { Colors } from "constants/Colors";

export const getCustomTextColor = (theme: Theme, backgroundColor?: string) => {
  if (!backgroundColor)
    return theme.colors.button[ButtonStyleTypes.PRIMARY.toLowerCase()].solid
      .textColor;
  const isDark = tinycolor(backgroundColor).isDark();
  if (isDark) {
    return theme.colors.button.custom.solid.light.textColor;
  }
  return theme.colors.button.custom.solid.dark.textColor;
};

export const getCustomHoverColor = (
  theme: Theme,
  buttonVariant?: ButtonVariant,
  backgroundColor?: string,
) => {
  if (!backgroundColor) {
    return theme.colors.button[ButtonStyleTypes.PRIMARY.toLowerCase()][
      (buttonVariant || ButtonVariantTypes.SOLID).toLowerCase()
    ].hoverColor;
  }

  switch (buttonVariant) {
    case ButtonVariantTypes.OUTLINE:
      return backgroundColor
        ? tinycolor(backgroundColor)
            .lighten(40)
            .toString()
        : theme.colors.button.primary.outline.hoverColor;

    case ButtonVariantTypes.GHOST:
      return backgroundColor
        ? tinycolor(backgroundColor)
            .lighten(40)
            .toString()
        : theme.colors.button.primary.ghost.hoverColor;

    default:
      return backgroundColor
        ? tinycolor(backgroundColor)
            .darken(10)
            .toString()
        : theme.colors.button.primary.solid.hoverColor;
  }
};

export const getCustomBackgroundColor = (
  buttonVariant?: ButtonVariant,
  backgroundColor?: string,
) => {
  return buttonVariant === ButtonVariantTypes.SOLID ? backgroundColor : "none";
};

export const getCustomBorderColor = (
  buttonVariant?: ButtonVariant,
  backgroundColor?: string,
) => {
  return buttonVariant === ButtonVariantTypes.OUTLINE
    ? backgroundColor
    : "none";
};

interface WrapperStyleProps {
  isHorizontal: boolean;
  borderRadius?: ButtonBorderRadius;
  boxShadow?: ButtonBoxShadow;
  boxShadowColor?: string;
}

const ButtonGroupWrapper = styled.div<ThemeProp & WrapperStyleProps>`
  height: 100%;
  width: 100%;
  position: relative;
  display: flex;
  justify-content: stretch;
  align-items: stretch;
  overflow: hidden;
  ${(props) =>
    props.isHorizontal ? "flex-direction: row" : "flex-direction: column"};

  border-radius: ${({ borderRadius }) =>
    borderRadius === ButtonBorderRadiusTypes.ROUNDED
      ? "8px"
      : borderRadius === ButtonBorderRadiusTypes.CIRCLE
      ? "32px"
      : "0px"};

  box-shadow: ${({ boxShadow, boxShadowColor, theme }) =>
    boxShadow === ButtonBoxShadowTypes.VARIANT1
      ? `0px 0px 4px 3px ${boxShadowColor ||
          theme.colors.button.boxShadow.default.variant1}`
      : boxShadow === ButtonBoxShadowTypes.VARIANT2
      ? `3px 3px 4px ${boxShadowColor ||
          theme.colors.button.boxShadow.default.variant2}`
      : boxShadow === ButtonBoxShadowTypes.VARIANT3
      ? `0px 1px 3px ${boxShadowColor ||
          theme.colors.button.boxShadow.default.variant3}`
      : boxShadow === ButtonBoxShadowTypes.VARIANT4
      ? `2px 2px 0px ${boxShadowColor ||
          theme.colors.button.boxShadow.default.variant4}`
      : boxShadow === ButtonBoxShadowTypes.VARIANT5
      ? `-2px -2px 0px ${boxShadowColor ||
          theme.colors.button.boxShadow.default.variant5}`
      : "none"} !important;
`;

const MenuButtonWrapper = styled.div`
  flex: 1 1 auto;

  & > .${Classes.POPOVER2_TARGET} {
    height: 100%;
  }
`;

const PopoverStyles = createGlobalStyle`
  .menu-button-popover > .${Classes.POPOVER2_CONTENT} {
    background: none;
  }
`;

interface ButtonStyleProps {
  isHorizontal: boolean;
  borderRadius?: ButtonBorderRadius;
  borderRadOnStart: boolean;
  borderRadOnEnd: boolean;
  buttonVariant?: ButtonVariant; // solid | outline | ghost
  buttonColor?: string;
  iconAlign?: string;
  isDisabled?: boolean;
}

const StyledButton = styled.button<ThemeProp & ButtonStyleProps>`
  flex: 1 1 auto;
  display: flex;
  cursor: pointer;
  justify-content: space-evenly;
  align-items: center;
  flex-direction: ${({ iconAlign }) =>
    iconAlign === "right" ? "row-reverse" : "row"};

  ${({
    borderRadius,
    borderRadOnEnd,
    borderRadOnStart,
    buttonColor,
    buttonVariant,
    isDisabled,
    isHorizontal,
    theme,
  }) => `
    & {
      background: ${
        getCustomBackgroundColor(buttonVariant, buttonColor) !== "none"
          ? getCustomBackgroundColor(buttonVariant, buttonColor)
          : buttonVariant === ButtonVariantTypes.SOLID
          ? theme.colors.button.primary.solid.bgColor
          : "none"
      } !important;
    }

    &:hover, &:active {
      background: ${
        getCustomHoverColor(theme, buttonVariant, buttonColor) !== "none"
          ? getCustomHoverColor(theme, buttonVariant, buttonColor)
          : buttonVariant === ButtonVariantTypes.OUTLINE
          ? theme.colors.button.primary.outline.hoverColor
          : buttonVariant === ButtonVariantTypes.GHOST
          ? theme.colors.button.primary.ghost.hoverColor
          : theme.colors.button.primary.solid.hoverColor
      } !important;
    }

    border: ${
      getCustomBorderColor(buttonVariant, buttonColor) !== "none"
        ? `1px solid ${getCustomBorderColor(buttonVariant, buttonColor)}`
        : buttonVariant === ButtonVariantTypes.OUTLINE
        ? `1px solid ${theme.colors.button.primary.outline.borderColor}`
        : "none"
    } !important;

    border-radius: ${
      borderRadius === ButtonBorderRadiusTypes.ROUNDED
        ? borderRadOnStart // first button
          ? isHorizontal
            ? "8px 0px 0px 8px"
            : "8px 8px 0px 0px"
          : borderRadOnEnd // last button
          ? isHorizontal
            ? "0px 8px 8px 0px"
            : "0px 0px 8px 8px"
          : "0px"
        : borderRadius === ButtonBorderRadiusTypes.CIRCLE
        ? borderRadOnStart // first button
          ? isHorizontal
            ? "32px 0px 0px 32px"
            : "32px 32px 0px 0px"
          : borderRadOnEnd // last button
          ? isHorizontal
            ? "0px 32px 32px 0px"
            : "0px 0px 32px 32px"
          : "0px"
        : "0px"
    };

    & span {
      color: ${
        buttonVariant === ButtonVariantTypes.SOLID
          ? getCustomTextColor(theme, buttonColor)
          : getCustomBackgroundColor(ButtonVariantTypes.SOLID, buttonColor)
      } !important;
    }

    ${isDisabled &&
      `
      & {
        cursor: not-allowed;
        pointer-events: none;
        border: 1px solid ${Colors.ALTO2} !important;
        background: ${theme.colors.button.disabled.bgColor} !important;
        span {
          color: ${theme.colors.button.disabled.textColor} !important;
        }
      }
    `}
  `}
`;

const StyledButtonContent = styled.div`
  & .bp3-icon {
    margin-right: 10px;
  }
`;

export interface BaseStyleProps {
  backgroundColor?: string;
  borderRadius?: ButtonBorderRadius;
  boxShadow?: ButtonBoxShadow;
  boxShadowColor?: string;
  buttonColor?: string;
  buttonStyle?: ButtonStyleType;
  buttonVariant?: ButtonVariant;
  textColor?: string;
}

const BaseMenuItem = styled(MenuItem)<ThemeProp & BaseStyleProps>`
  padding: 8px 10px !important;
  ${({ backgroundColor, theme }) =>
    backgroundColor
      ? `
      background-color: ${backgroundColor} !important;
      &:hover {
        background-color: ${darkenHover(backgroundColor)} !important;
      }
      &:active {
        background-color: ${darkenActive(backgroundColor)} !important;
      }
  `
      : `
    background: none !important
      &:hover {
        background-color: ${tinycolor(
          theme.colors.button.primary.solid.textColor,
        )
          .darken()
          .toString()} !important;
      }
      &:active {
        background-color: ${tinycolor(
          theme.colors.button.primary.solid.textColor,
        )
          .darken()
          .toString()} !important;
      }
    `}
  ${({ textColor }) =>
    textColor &&
    `
      color: ${textColor} !important;
  `}
`;

const StyledMenu = styled(Menu)`
  padding: 0;
  background: none;
`;

interface PopoverContentProps {
  menuItems: Record<
    string,
    {
      widgetId: string;
      id: string;
      index: number;
      isVisible?: boolean;
      isDisabled?: boolean;
      label?: string;
      backgroundColor?: string;
      textColor?: string;
      iconName?: IconName;
      iconColor?: string;
      iconAlign?: Alignment;
      onClick?: string;
    }
  >;
  onItemClicked: (onClick: string | undefined) => () => void;
}

function PopoverContent(props: PopoverContentProps) {
  const { menuItems, onItemClicked } = props;

  let items = Object.keys(menuItems)
    .map((itemKey) => menuItems[itemKey])
    .filter((item) => item.isVisible === true);
  // sort btns by index
  items = sortBy(items, ["index"]);

  const listItems = items.map((menuItem) => {
    const {
      backgroundColor,
      iconAlign,
      iconColor,
      iconName,
      id,
      isDisabled,
      label,
      onClick,
      textColor,
    } = menuItem;
    if (iconAlign === Alignment.RIGHT) {
      return (
        <BaseMenuItem
          backgroundColor={backgroundColor}
          disabled={isDisabled}
          key={id}
          labelElement={<Icon color={iconColor} icon={iconName} />}
          onClick={onItemClicked(onClick)}
          text={label}
          textColor={textColor}
        />
      );
    }
    return (
      <BaseMenuItem
        backgroundColor={backgroundColor}
        disabled={isDisabled}
        icon={<Icon color={iconColor} icon={iconName} />}
        key={id}
        onClick={onItemClicked(onClick)}
        text={label}
        textColor={textColor}
      />
    );
  });

  return <StyledMenu>{listItems}</StyledMenu>;
}

class ButtonGroupComponent extends React.Component<ButtonGroupComponentProps> {
  onButtonClick = (onClick: string | undefined) => () => {
    this.props.buttonClickHandler(onClick);
  };

  render = () => {
    const { buttonVariant, groupButtons, isDisabled, orientation } = this.props;
    const isHorizontal = orientation === "horizontal";

    let items = Object.keys(groupButtons)
      .map((itemKey) => groupButtons[itemKey])
      .filter((item) => item.isVisible === true);
    // sort btns by index
    items = sortBy(items, ["index"]);

    return (
      <ButtonGroupWrapper
        borderRadius={this.props.borderRadius}
        boxShadow={this.props.boxShadow}
        boxShadowColor={this.props.boxShadowColor}
        className="t--buttongroup-widget"
        isHorizontal={isHorizontal}
      >
        {items.map((button) => {
          const borderRadOnStart = button.index === 0;
          const borderRadOnEnd = button.index === items.length - 1;
          const isButtonDisabled = button.isDisabled || isDisabled;

          if (button.buttonType === "MENU" && !isButtonDisabled) {
            const { menuItems } = button;

            return (
              <MenuButtonWrapper key={button.id}>
                <PopoverStyles />
                <Popover2
                  content={
                    <PopoverContent
                      menuItems={menuItems || {}}
                      onItemClicked={this.onButtonClick}
                    />
                  }
                  disabled={button.isDisabled}
                  fill
                  minimal
                  placement="bottom-end"
                  popoverClassName="menu-button-popover"
                >
                  <StyledButton
                    borderRadOnEnd={borderRadOnEnd}
                    borderRadOnStart={borderRadOnStart}
                    borderRadius={this.props.borderRadius}
                    buttonColor={button.buttonColor}
                    buttonVariant={buttonVariant}
                    iconAlign={button.iconAlign}
                    isDisabled={isButtonDisabled}
                    isHorizontal={isHorizontal}
                    style={{ height: "100%", width: "100%" }}
                  >
                    <StyledButtonContent>
                      {button.iconName && <Icon icon={button.iconName} />}
                      {!!button.label && <span>{button.label}</span>}
                    </StyledButtonContent>
                  </StyledButton>
                </Popover2>
              </MenuButtonWrapper>
            );
          }
          return (
            <StyledButton
              borderRadOnEnd={borderRadOnEnd}
              borderRadOnStart={borderRadOnStart}
              borderRadius={this.props.borderRadius}
              buttonColor={button.buttonColor}
              buttonVariant={buttonVariant}
              iconAlign={button.iconAlign}
              isDisabled={isButtonDisabled}
              isHorizontal={isHorizontal}
              key={button.id}
              onClick={this.onButtonClick(button.onClick)}
            >
              <StyledButtonContent>
                {button.iconName && <Icon icon={button.iconName} />}
                {!!button.label && <span>{button.label}</span>}
              </StyledButtonContent>
            </StyledButton>
          );
        })}
      </ButtonGroupWrapper>
    );
  };
}

interface GroupButtonProps {
  widgetId: string;
  id: string;
  index: number;
  isVisible?: boolean;
  isDisabled?: boolean;
  label?: string;
  buttonType?: string;
  buttonColor?: string;
  iconName?: IconName;
  iconAlign?: Alignment;
  onClick?: string;
  menuItems: Record<
    string,
    {
      widgetId: string;
      id: string;
      index: number;
      isVisible?: boolean;
      isDisabled?: boolean;
      label?: string;
      backgroundColor?: string;
      textColor?: string;
      iconName?: IconName;
      iconColor?: string;
      iconAlign?: Alignment;
      onClick?: string;
    }
  >;
}

export interface ButtonGroupComponentProps {
  orientation: string;
  isDisabled: boolean;
  borderRadius?: ButtonBorderRadius;
  boxShadow?: ButtonBoxShadow;
  boxShadowColor?: string;
  buttonVariant: ButtonVariant;
  buttonClickHandler: (onClick: string | undefined) => void;
  groupButtons: Record<string, GroupButtonProps>;
}

export default ButtonGroupComponent;
