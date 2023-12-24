export function CreateNameSubString(str) {
    if (str.length <= 20) {
      return str;
    } else {
      return str.substring(0, 20) + '...';
    }
  }
export function ChatHeaderNameSubString(str) {
    if (str.length <= 23) {
      return str;
    } else {
      return str.substring(0, 23) + '...';
    }
  }
export function CreateLastMsgSubString(str) {
    if (str.length <= 22) {
      return str;
    } else {
      return str.substring(0, 22) + '...';
    }
  }