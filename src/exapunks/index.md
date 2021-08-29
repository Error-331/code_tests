# Exapunks

clamp 9999
NOTE SENDER
ADDI X (9999 - max_value) M

NOTE RECEIVER
SUBI M (9999 - mav_value) X

SWIZ can also be used to pack data, if values are between 0 and 99 it can be used to retrieve two values in one register.




COPY 10 T
MARK WHILE
  NOTE DO STUFF
  SUBI T 1 T
  TJMP WHILE
  
  
  
  NOTE X IS ENTRY WE ARE SEARCHING FOR
  GRAB 199
  MARK READING
    TEST F = X
    FJMP READING
  NOTE GET THE NEXT ENTRY FROM FILE
  NOTE YOU MIGHT WANT TO USE `SEEK` TO MOVE THE FILE POINTER
  COPY F X
  
  
  NOTE X IS ENTRY WE ARE SEARCHING FOR
  GRAB 199
  MARK READING
    TEST F = X
    NOTE ADVANCE FILE HEADER TO NEXT LINE, SAVING 2 LOOPS
    SEEK 2
    FJMP READING
  NOTE GET THE NEXT ENTRY FROM FILE
  SEEK -2
  COPY F X
  
  
  read and delete
  MARK GET_IT_OUT
    NOTE DO STUFF WITH F
    COPY F M
    SEEK -1
    VOID F
    TEST EOF
    FJMP GET_IT_OUT
    
    
    
    XA will send the message size to XB and use it for its own loop:
    
    NOTE XA - SENDER
    GRAB 199
    NOTE `T` CONTAINS THE NUMBER OF CHUNKS TO READ
    COPY T M
    MARK READING
      COPY F M
      NOTE COUNT DOWN REMAINING CHUNKS
      SUBI T 1 T
      TJMP READING
    XA and XB will have the same loop conditions:
    
    NOTE XB - RECEIVER
    MAKE 
    NOTE NOW `T` CONTAINS THE MESSAGE SIZE
    COPY M T
    MARK WRITING
      COPY M F
      NOTE COUNT DOWN REMAINING CHUNKS
      SUBI T 1 T
      TJMP WRITING
      
      
      
      Sending „Keep Alive Messages“
      For bullet-proof communication your best choice is to have XA send a „keep alive message“…
      
      NOTE XA - SENDER
      GRAB 199
      MARK READING
        COPY F M
        TEST EOF
        NOTE SEND RESULT OF TEST TO M...
        COPY T M
        NOTE ...AND USE RESULT FOR YOUR OWN LOOP
        FJMP READING
      …to XB:
      
      NOTE XB - RECEIVER
      MAKE 
      MARK WRITING
        COPY M F
        NOTE USE TEST RESULT TO TEST FOR YOURSELF
        TEST M = 1
        FJMP WRITING