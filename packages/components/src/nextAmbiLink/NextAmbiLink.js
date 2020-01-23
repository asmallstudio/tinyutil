import Link from "next/link";

const NextAmbiLink = ({ href, as, children, ...props }) => {
  function isInternal(link) {
    if (typeof link !== "string") return true;
    return (
      !link.match(/^#/) &&
      !link.match(/^[a-z]{1,10}:\/\//) &&
      !link.match(/^mailto:|^tel:/)
    );
  }

  if (isInternal(href)) {
    return (
      <Link href={href} as={as}>
        <a {...props}>{children}</a>
      </Link>
    );
  }

  return (
    <a href={href} {...props}>
      {children}
    </a>
  );
};

export { NextAmbiLink };
