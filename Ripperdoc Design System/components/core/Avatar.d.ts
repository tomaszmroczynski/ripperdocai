import * as React from 'react';

export interface AvatarProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Image URL. Falls back to initials from `name`. */
  src?: string | null;
  /** Full name — used for initials and alt text. */
  name?: string;
  /** Pixel diameter. @default 40 */
  size?: number;
  /** Show the ember "active" halo + status dot. @default false */
  active?: boolean;
  /** Ember hairline ring (logomark echo). @default true */
  ring?: boolean;
}

/** Human presence, ringed like the logomark. Initials fallback. */
export function Avatar(props: AvatarProps): JSX.Element;
