interface HideForFixedTimeProps {
  timeDuration: number;
  setHideComponent: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function hideComponentForFixedTime(
  timeDuration: HideForFixedTimeProps["timeDuration"],
  setHideComponent: HideForFixedTimeProps["setHideComponent"]
) {
  setHideComponent(false); // Hide the components
  setTimeout(() => {
    setHideComponent(true); // Show the components again after the specified duration
  }, timeDuration);
}
